const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/user.model');
const Log = require('../models/log.model');

const signToken = userID => {
    return JWT.sign({
        iss: "MateoNav",
        sub: userID
    }, "MateoNav", {expiresIn: "1h"});
}

router.post('/register',(req,res) => {
    const{ username, fullname, email, password} = req.body;
    User.findOne({username}, (err, user) => {
        if(err)
            res.status(err).json({message: {messageBody: "Error has occurred", errorMessage: true}})
        if(user)
            res.status(400).json({message: {messagBody: "Username is already registered", errorMessage: true}})
        else {
            User.findOne({email}, (err, user) => {
                if(err)
                    res.status(err).json({message: {messageBody: "Error has occurred", errorMessage: true}})
                if(user)
                    res.status(400).json({message: {messagBody: "Email is already registered", errorMessage: true}})
                else {
                    const newUser = new User({username, fullname, email, password});
                    newUser.save(err => {
                        if(err)
                            res.status(500).json({message : {messagBody: "Error has occured - new user not created", errorMessage: true}});
                        else
                            res.status(201).json({message : {messagBody: "Account created", errorMessage: false}});
                    })
                }
            })
            
        }
    })
})
router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        const {_id, username} = req.user;
        const token = signToken(_id);
        res.cookie('jwt', token, {httpOnly: true, sameSite: 'none', secure: true, domain: 'covid-conscious.herokuapp.com'});
        res.status(200).json({isAuthenticated: true, user: {username}});
    }
});

router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('jwt');
    res.json({user: {username: ""}, success: true});
});

router.get('/covidlog', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findById({_id: req.user._id}).populate('logs').exec((err, document) => {
        if(err)
            res.status(err).json({message: {messagBody: 'Error has occurred', errorMessage: true}})
        else{
            res.status(200).json({logs: document.logs, authenticated: true})
        }
    });
});


router.route('/covidlog/:id').delete((req, res) => {
    Log.findByIdAndDelete(req.params.id)
        .then(() => res.json('Covid log deleted'))
        .catch((err) => res.json(err))
})

router.post('/covidlog/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const logDate = Date.parse(req.body.logDate);
    const location = req.body.location;
    const duration = Number(req.body.duration);
    const interactions = Number(req.body.interactions);
    const newCovidLog = new Log({
        logDate,
        location,
        duration,
        interactions
    })
    newCovidLog.save(err => {
        if(err)
            res.status(err).json({message: {messagBody: 'Error: ', errorMessage: true}})
        else{
            req.user.logs.push(newCovidLog)
            req.user.save(err => {
                if(err)
                    res.status(err).json({message: {messagBody: 'Error: ', errorMessage: true}})
                else
                    res.status(200).json({message: {messagBody: 'Created covid log', errorMessage: false}})
            })
        }
    })
});

router.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {username} = req.user;
    res.status(200).json({isAuthenticated: true, user: {username}});
});

module.exports = router;
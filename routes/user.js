const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/user.model');
const Log = require('../models/log.model');

const signToken = userID => {
    // JWT.sign returns the actual jwt token
    return JWT.sign({
        iss: "MateoNav",
        sub: userID
    }, "MateoNav", {expiresIn: "1h"});
}

router.post('/register',(req,res) => {
    const{ username, fullname, email, password} = req.body;
    // searches for the username
    User.findOne({username}, (err, user) => {
        if(err)
            res.status(err).json({message: {msgBody: "Error has occurred", msgError: true}})
        if(user)
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}})
        // if no error and if username entered isn't a duplicate, create this new username
        else {
            const newUser = new User({username, fullname, email, password});
            newUser.save(err => {
                if(err)
                    res.status(err).json({message: {msgBody: "Error has occurred", msgError: true}})
                else
                    res.status(201).json({message: {msgBody: "Account successfully created", msgError: true}})

            })
        }

    })
})
router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    if(req.isAuthenticated()){
        const {_id, username} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {username}});
    }
});

router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('access_token');
    res.json({user: {username: ""}, success: true});
});

router.route('/covidlog').get((req, res) => {
    Log.find()
        .then(covidLogs => res.json(covidLogs))
        .catch(err => res.json(err));
});

router.route('/covidlog/:id').get((req, res) => {
    let id = req.params.id;
    Log.findById(id)
        .then(log => res.json(log))
        .catch(err => res.json(err));
})

router.route('/covidlog/:id').delete((req, res) => {
    Log.findByIdAndDelete(req.params.id)
        .then(() => res.json('Covid log deleted'))
        .catch((err) => res.json(err))
})

router.route('/covidlog/add').post((req, res) => {
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
    newCovidLog.save()
    .then(() => res.json({status: 'Covid log added'}))
    .catch((err) => res.json(err));
});

module.exports = router;
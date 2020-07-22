const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/user.model');
const Log = require('../models/log.model');

router.post('/register',(req,res) => {
    const{ username, password } = req.body;
    User.findOne({username}, (err, user) => {
        if(err)
            res.status(err).json({message: {msgBody: "Error has occurred", msgError: true}})
        if(user)
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}})
        else {
            const newUser = new User({username, password});
            new User.save(err => {
                if(err)
                    res.status(err).json({message: {msgBody: "Error has occurred", msgError: true}})
                else
                    res.status(201).json({message: {msgBody: "Account successfully created", msgError: true}})

            })
        }

    })
})

module.exports = router;
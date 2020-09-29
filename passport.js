const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["jwt"];
    }
    return token;
}

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'MateoNav'
}, (payload, done) => {
    console.log("JWT hit")
    
    User.findById({_id: payload.sub}, (err, user) => {
        if(err)
            return done(err, false);
        if(user)
            return done(null, user);
        else
            return done(null, false);
    });
}));

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        console.log("LOCAL hit")
        if(err)
            return done(err);
        if(!user)
            return done(null, false);
        user.comparePassword(password, done);
    })
}));
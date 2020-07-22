const passport = require('passpost');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

//used for authorization. whenever we want to protect a resource. 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "MateoNav"
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err)
            return done(err, false);
        if(user)
            return done(null, user);
        else
            return done(null, false);
    });
}))

//used for authenticating username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        if(err)
            return done(err);
        //if that user doesn't exist, return false
        if(!user)
            return done(null, false);
        //checks to see if the password is correct
        user.comparePassword(password, done);
    })
}));
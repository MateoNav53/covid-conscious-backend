const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req => {
    let token = null;
    //if there's a request, and request.cookies isn't empty,
    //we're going to check if there's a JWT
    if(req && req.cookies){
        //we are setting the cookie as an access token, titled 'access_token'
        token = req.cookies["access_token"];
    }
    return token;
}

//used for authorization. whenever we want to protect a resource. 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "MateoNav"
}, (payload, done) => {
    //check to see if the user exists, search by primary key which is payload.sub
    User.findById({_id: payload.sub}, (err, user) => {
        //If there's an error, return the error and false
        if(err)
            return done(err, false);
        //if the user isn't null, return the user
        if(user)
            return done(null, user);
        //if there's no error, but no user with that primary key, return false
        else
            return done(null, false);
    });
}))

//Local Strategy lets you authenticate using a username and password
passport.use(new LocalStrategy((username, password, done) => {
    //Checks the database to see if the username exists
    User.findOne({username}, (err, user) => {
        if(err)
            return done(err);
        //if that user doesn't exist, return false
        if(!user)
            return done(null, false);
        //If this is the user, use comparePassword function to see if the password is correct
        user.comparePassword(password, done);
    })
}));
const mongoose = require('mongoose');
const Log = require('./log.model');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
    logs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Log'}]
}, { timestamps: true });

//checks to see if the password field has been modified already.
//if it has been modified, then there's no need to hash the password.
userSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10,(err, passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

//compares the password input from the client end to the hashed password in the db
userSchema.methods.comparePassword = function(password, callback){
    bcrypt.compare(password,this.password,(err, isMatch)=>{
        if(err)
            return callback(err)
        else{
            if(!isMatch)
                return callback(null, isMatch);
            return callback(null, this);
        }
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;
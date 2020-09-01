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
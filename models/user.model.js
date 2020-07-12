const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: trim,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    }
}, { timestamps: true });

const User = mongoose.model('User', usersSchema);

module.exports = User;
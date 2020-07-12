const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    date: { 
        type: Date, 
        required: true, 
        default: Date.now()
    },
    place: {
        type: String, 
        required: true  
    },
    duration: {
        type: Number, 
        required: true 
    },
    interactions: { 
        type: Number, 
        required: true 
    },
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
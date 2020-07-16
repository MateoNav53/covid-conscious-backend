const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    logDate: { 
        type: Date, 
        required: true, 
        default: Date.now()
    },
    location: {
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
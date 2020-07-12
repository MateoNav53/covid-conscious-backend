//sets up express and cors
const express = require('express');
const cors = require('cors');

//connects to MongoDB database
const mongoose = require('mongoose')

//links the .env file
require('dotenv').config();

//creates express server and sets which port you want to use
const app = express();
const port = process.env.PORT || 7000;

//middleware that uses cors and allows us to parse json
//middleware provides extra services that are outside your operating system.
//helps frontend and backend interact with each other
app.use(cors());
app.use(express.json());

//creates routes for the index
app.use('/', require('./routes/index'))
//creates routes for user and logs
app.use('/user', require('./routes/user'))
app.use('/log', require('./routes/log'))

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database successfully connected")
})

//starts the server on your given port and gives confirmation message
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
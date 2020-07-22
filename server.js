//sets up express, cors, and cookie parser
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

//connects to MongoDB database
const mongoose = require('mongoose')

//links the .env file
require('dotenv').config();

//creates express server and sets which port you want to use
const app = express();
const port = process.env.PORT || 7000;

const User = require('./models/user.model');

// const userInput = {
//     username: "MateoNav",
//     password: "mateon123",
//     fullname: "Mateo Navarrette",
//     email: "mateonav24@gmail.com"
// }

// const user = new User(userInput);
// user.save((err, document)=> {
//     if(err){
//         console.log(err);
//     console.log(document);
//     }
// })

//middleware that uses cors and allows us to parse json
//middleware provides extra services that are outside your operating system.
//helps frontend and backend interact with each other
app.use(cors());
app.use(express.json());
app.use(cookieParser());


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
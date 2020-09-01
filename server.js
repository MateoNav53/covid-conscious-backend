const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

const User = require('./models/user.model');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/user', require('./routes/user'))

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database successfully connected")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
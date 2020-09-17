const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/user', require('./routes/user'))
app.get('/', (req, res) => { res.send('Hello from Express!')})

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database successfully connected")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
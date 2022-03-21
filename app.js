require('dotenv').config()
require('./config/database').connect();

const todo = require('./routes/todo')
const express = require('express')
const auth = require('./middleware/auth');
const authUser = require('./routes/auth')
var bodyParser = require('body-parser');

const app = express()

app.use(express.json())

app.use('/auths', authUser);

app.use('/todos', todo)

app.post('/welcome', auth, (req, res) =>{
    res.status(200).send("Welcome")
})



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// charge routes
var user_routes = require('./routes/user');

// middlewares of body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// config headers and cors


// routes base
app.use('/api', user_routes);

// app.get('/testing', (req, res) => {
//     res.status(200).send({ message: 'This is the testing method' })
// });


module.exports = app;
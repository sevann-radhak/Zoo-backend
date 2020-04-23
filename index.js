'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('DB conection successfully...');
        app.listen(port, () => {
            console.log('Local server with Node and Express is running...');

        });
    })
    .catch(err => console.log(err));
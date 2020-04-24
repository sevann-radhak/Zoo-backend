'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    image: String,
    name: String,
    password: String,
    role: String,
    surname: String
});

module.exports = mongoose.model('User', UserSchema);
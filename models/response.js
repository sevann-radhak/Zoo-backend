'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResponseSchema = new Schema({
    isSuccess: Boolean,
    message: String,
    result: Object
}, { _id: false });

module.exports = mongoose.model('Response', ResponseSchema);
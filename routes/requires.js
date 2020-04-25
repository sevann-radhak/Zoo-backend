'use strict'

var express = require('express');
var api = express.Router();
var md_auth = require('./../middlewares/authenticated');
var multipart = require('connect-multiparty');

module.exports = {
    express,
    api,
    md_auth,
    multipart
}
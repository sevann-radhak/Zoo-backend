'use strict'

var express = require('express');
var api = express.Router();
var md_auth = require('./../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin')
var multipart = require('connect-multiparty');

module.exports = {
    api,
    express,
    md_admin,
    md_auth,
    multipart
}
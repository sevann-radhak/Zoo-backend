'use strict'

var requires = require('./requires');
var UserController = require('./../controllers/user');

// var express = require('express');

// var api = requires.express.Router();
// var md_auth = require('./../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = requires.multipart({ uploadDir: './uploads/users' });

// api.get('/pruebas-user', md_auth.ensureAuth, UserController.pruebas);
requires.api.get('/getImageFile/:imageFile', UserController.getImageFile);
requires.api.get('/getKeeperes', UserController.getKeepers);
requires.api.post('/login', UserController.login);
requires.api.post('/create', UserController.save);
requires.api.put('/update/:id', requires.md_auth.ensureAuth, UserController.update);
requires.api.post('/uploadImage/:userId', [requires.md_auth.ensureAuth, requires.md_upload], UserController.uploadImage);

module.exports = requires.api;
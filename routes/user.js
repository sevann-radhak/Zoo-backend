'use strict'

var requires = require('./requires');
var UserController = require('./../controllers/user');

// var express = require('express');

// var api = requires.express.Router();
// var md_auth = require('./../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = requires.multipart({ uploadDir: './uploads/users' });

// api.get('/pruebas-user', md_auth.ensureAuth, UserController.pruebas);
requires.api.get('/users/imageFile/:imageFile', UserController.getImageFile);
requires.api.get('/users/getKeepers', UserController.getKeepers);
requires.api.post('/users/login', UserController.login);
requires.api.post('/users', UserController.save);
requires.api.put('/users/:id', requires.md_auth.ensureAuth, UserController.update);
requires.api.post('/users/uploadImage/:userId', [requires.md_auth.ensureAuth, requires.md_upload], UserController.uploadImage);

module.exports = requires.api;
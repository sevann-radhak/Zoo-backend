'use strict'

var requires = require('./requires');
var md_upload = requires.multipart({ uploadDir: './uploads/users' });
var UserController = require('./../controllers/user');

requires.api.get('/users/imageFile/:imageFile', UserController.getImageFile);
requires.api.get('/users/getKeepers', UserController.getKeepers);
requires.api.post('/users/login', UserController.login);
requires.api.post('/users', UserController.save);
requires.api.put('/users/:id', requires.md_auth.ensureAuth, UserController.update);
requires.api.post('/users/uploadImage/:userId', [requires.md_auth.ensureAuth, md_upload], UserController.uploadImage);

module.exports = requires.api;
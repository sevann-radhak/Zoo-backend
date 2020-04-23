'use strict'

var express = require('express');
var UserController = require('./../controllers/user');

var api = express.Router();
var md_auth = require('./../middlewares/authenticated');

api.get('/pruebas-user', md_auth.ensureAuth, UserController.pruebas);
api.post('/create', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;
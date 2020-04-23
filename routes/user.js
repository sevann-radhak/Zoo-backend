'use strict'

var express = require('express');
var UserController = require('./../controllers/user');

var api = express.Router();

api.get('/pruebas-user', UserController.pruebas);
api.post('/create', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;
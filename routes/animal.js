'use strict'

var requires = require('./requires');
var UserController = require('./../controllers/user');
var AnimalController = require('./../controllers/animal');

requires.api.get('/pruebas', requires.md_auth.ensureAuth, AnimalController.pruebas);

module.exports = requires.api;
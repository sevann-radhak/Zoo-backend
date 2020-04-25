'use strict'

var requires = require('./requires');
var UserController = require('./../controllers/user');
var AnimalController = require('./../controllers/animal');

requires.api.get('/animals/:animalId', AnimalController.getAnimal);
requires.api.get('/animals', AnimalController.getAnimals);
requires.api.post('/animals', requires.md_auth.ensureAuth, AnimalController.saveAnimal);
requires.api.put('/animals/:animalId', requires.md_auth.ensureAuth, AnimalController.updateAnimal);

module.exports = requires.api;
'use strict'

var requires = require('./requires');
var md_upload = requires.multipart({ uploadDir: './uploads/animals' });
var UserController = require('./../controllers/user');
var AnimalController = require('./../controllers/animal');

requires.api.delete('/animals/:animalId', requires.md_auth.ensureAuth, AnimalController.deleteAnimal);
requires.api.get('/animals/:animalId', AnimalController.getAnimal);
requires.api.get('/animals', AnimalController.getAnimals);
requires.api.post('/animals', requires.md_auth.ensureAuth, AnimalController.saveAnimal);
requires.api.put('/animals/:animalId', requires.md_auth.ensureAuth, AnimalController.updateAnimal);
requires.api.get('/animals/imageFile/:imageFile', AnimalController.getImageFile);
requires.api.post('/animals/uploadImage/:animalId', [requires.md_auth.ensureAuth, md_upload], AnimalController.uploadImage);

module.exports = requires.api;
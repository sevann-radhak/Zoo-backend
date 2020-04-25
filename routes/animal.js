'use strict'

var requires = require('./requires');
var md_upload = requires.multipart({ uploadDir: './uploads/animals' });
var AnimalController = require('./../controllers/animal');

requires.api.delete('/animals/:animalId', [requires.md_auth.ensureAuth, requires.md_admin.isAdmin], AnimalController.deleteAnimal);
requires.api.get('/animals/:animalId', AnimalController.getAnimal);
requires.api.get('/animals', AnimalController.getAnimals);
requires.api.post('/animals', [requires.md_auth.ensureAuth, requires.md_admin.isAdmin], AnimalController.saveAnimal);
requires.api.put('/animals/:animalId', [requires.md_auth.ensureAuth, requires.md_admin.isAdmin], AnimalController.updateAnimal);
requires.api.get('/animals/imageFile/:imageFile', AnimalController.getImageFile);
requires.api.post('/animals/uploadImage/:animalId', [requires.md_auth.ensureAuth, requires.md_admin.isAdmin, md_upload], AnimalController.uploadImage);

module.exports = requires.api;
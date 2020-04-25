'use strictt'

var requires = require('./requires');
var responses = require('./responses');
var User = require('./../models/user');
var Animal = require('./../models/animal');

function getAnimal(req, res) {
    var { animalId } = req.params;

    Animal.findById(animalId).populate({ path: 'user' }).exec((err, animal) => {
        err ?
            responses.response(res, 500) :
            !animal ?
            responses.response(res, 404) :
            responses.response(res, 200, animal);
    });
}

function getAnimals(req, res) {
    Animal.find({}).populate({ path: 'user' }).exec((err, animals) => {
        err ?
            responses.response(res, 500) :
            !animals ?
            responses.response(res, 404) :
            responses.response(res, 200, animals);
    });
}

function saveAnimal(req, res) {
    var params = req.body;

    if (params.name) {
        var animal = new Animal({} = params);
        animal.user = req.user.sub

        animal.save((err, animalStored) => {
            err ?
                responses.response(res, 500) :
                !animalStored ?
                responses.response(res, 501) :
                responses.response(res, 201, animalStored);
        });
    } else {
        responses.response(res, 400);
    }
}

function updateAnimal(req, res) {
    var { animalId } = req.params;
    var update = req.body;

    Animal.findByIdAndUpdate(animalId, update, { new: true }, (err, animalUpdated) => {
        err ?
            responses.response(res, 500) :
            !animalUpdated ?
            responses.response(res, 404) :
            responses.response(res, 200, animalUpdated);
    });
}

module.exports = {
    getAnimal,
    getAnimals,
    saveAnimal,
    updateAnimal
};
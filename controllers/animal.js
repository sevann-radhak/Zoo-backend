'use strictt'

var requires = require('./requires');
var responses = require('./responses');
var User = require('./../models/user');
var Animal = require('./../models/animal');

function deleteAnimal(req, res) {
    var { animalId } = req.params;

    Animal.findByIdAndRemove(animalId, (err, animalRemoved) => {
        err ?
            responses.response(res, 500) :
            !animalRemoved ?
            responses.response(res, 404) :
            responses.response(res, 200, animalRemoved);
    });
}

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

function getImageFile(req, res) {
    var { imageFile } = req.params;
    var path_file = `./uploads/animals/${imageFile}`;

    requires.fs.exists(path_file, function(exists) {
        exists ?
            res.sendFile(requires.path.resolve(path_file)) :
            responses.response(res, 404);
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

function uploadImage(req, res) {
    var { animalId } = req.params;

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1].toLowerCase();

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Animal.findByIdAndUpdate(animalId, { image: file_name }, { new: true }, (err, animalUpdate) => {
                err ?
                    responses.response(res, 500) :
                    !animalUpdate ?
                    responses.response(res, 501) :
                    responses.response(res, 200, { animalUpdate, image: file_name });
            });

            // userId != req.user.sub ?
            //     responses.response(res, 401) :
            //     User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdate) => {
            //         err ?
            //             responses.response(res, 500) :
            //             !userUpdate ?
            //             responses.response(res, 501) :
            //             responses.response(res, 200, { userUpdate, image: file_name });
            //     });
        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(400).send(new requires.Response({
                        isSuccess: false,
                        message: `${requires.CONSTANTS.BD_ERROR_400} - extension not valid, file not deleted.`
                    }));
                } else {
                    res.status(400).send(new requires.Response({
                        isSuccess: false,
                        message: `${requires.CONSTANTS.BD_ERROR_400} - extension not valid.`
                    }));
                }
            });
        }
    } else {
        responses.response(res, 400);
    }
}

module.exports = {
    deleteAnimal,
    getAnimal,
    getAnimals,
    getImageFile,
    saveAnimal,
    updateAnimal,
    uploadImage
};
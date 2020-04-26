'use strictt'

var requires = require('./requires');
var responses = require('./responses');
var User = require('./../models/user');

function getImageFile(req, res) {
    var { imageFile } = req.params;
    var path_file = `./uploads/users/${imageFile}`;

    requires.fs.exists(path_file, function(exists) {
        exists ?
            res.sendFile(requires.path.resolve(path_file)) :
            responses.response(res, 404);
    });
}

function getKeepers(req, res) {
    User.find({ role: requires.CONSTANTS.ROLE_ADMIN }).exec((err, users) => {
        err ?
            responses.response(res, 500) :
            !users ?
            responses.response(res, 404) :
            responses.response(res, 200, users);
    });
}

function login(req, res) {
    var params = req.body;
    var { email, password } = params;

    if (email && password) {
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
            if (err) {
                responses.response(res, 500);
            } else {
                user ?
                    requires.bcrypt.compare(password, user.password, (err, check) => {
                        user.password = '';
                        check ?
                            params.gettoken ?
                            responses.response(res, 200, requires.jwt.createToken(user)) :
                            responses.response(res, 200, user) :
                            res.status(400).send(new requires.Response({
                                isSuccess: false,
                                message: 'User or password incorrect'
                            }));
                    }) :
                    responses.response(res, 404);
            }
        });
    } else {
        responses.response(res, 400);
    }
}

function save(req, res) {
    var params = req.body;

    if (params.password && params.name && params.email) {
        var user = new User({} = params);

        requires.bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            user.email = user.email.toLowerCase();

            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    responses.response(res, 500);
                } else {
                    issetUser ?
                        res.status(501).send(new requires.Response({
                            isSuccess: false,
                            message: 'This user already exists in DB'
                        })) :
                        user.save((err, userStored) => {
                            err ?
                                responses.response(res, 500) :
                                !userStored ?
                                responses.response(res, 501) :
                                responses.response(res, 200, userStored);
                        });
                }
            });
        });
    } else {
        responses.response(res, 400);
    }
}

function update(req, res) {
    userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub) {
        responses.response(res, 401);
    } else {
        User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
            err ?
                responses.response(res, 500) :
                !userUpdated ?
                responses.response(res, 501) :
                responses.response(res, 200, userUpdated);
        });
    }
}

function uploadImage(req, res) {
    var { userId } = req.params;

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1].toLowerCase();

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            userId != req.user.sub ?
                responses.response(res, 401) :
                User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdate) => {
                    err ?
                        responses.response(res, 500) :
                        !userUpdate ?
                        responses.response(res, 501) :
                        responses.response(res, 200, { userUpdate, image: file_name });
                });
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

// export
module.exports = {
    getImageFile,
    getKeepers,
    login,
    save,
    update,
    uploadImage
};
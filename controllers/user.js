'use strictt'

// constants
var constants = require('./../constants/constants');

// modules
var bcrypt = require('bcrypt-nodejs');

// models
var Response = require('./../models/response')
var User = require('./../models/user');

// actions
function pruebas(req, res) {
    res.status(200).send({
        message: 'Testing user controller and function pruebas'
    })
}

function login(req, res) {
    var params = req.body;
    var { email, password } = params;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send(new Response({
                isSuccess: false,
                message: constants.BD_ERROR_500
            }));
        } else {
            user ?
                bcrypt.compare(password, user.password, (err, check) => {
                    check ?
                        res.status(200).send(new Response({
                            isSuccess: true,
                            result: user
                        })) :
                        res.status(401).send(new Response({
                            isSuccess: true,
                            result: 'User or password incorrect'
                        }));
                }) :
                res.status(404).send(new Response({
                    isSuccess: false,
                    message: constants.BD_ERROR_404
                }));
        }
    });
}


function saveUser(req, res) {
    var params = req.body;

    if (params.password && params.name && params.email) {
        var user = new User({} = params);


        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            user.email = user.email.toLowerCase();

            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    res.status(500).send(new Response({
                        isSuccess: false,
                        message: constants.BD_ERROR_500
                    }));
                } else {
                    issetUser ?
                        res.status(401).send(new Response({
                            isSuccess: false,
                            message: 'This user already exists in DB'
                        })) :
                        user.save((err, userStored) => {
                            err
                                ?
                                res.status(500).send(new Response({
                                    isSuccess: false,
                                    message: constants.BD_ERROR_500
                                })) :
                                !userStored ?
                                res.status(501).send(new Response({
                                    isSuccess: false,
                                    message: constants.BD_ERROR_501
                                })) :
                                res.status(200).send(new Response({
                                    isSuccess: true,
                                    result: userStored
                                }));
                        });
                }
            });
        });
    } else {
        res.status(401).send(new Response({
            isSuccess: false,
            message: constants.MODEL_INVALID
        }));
    }
}

// export
module.exports = {
    pruebas,
    login,
    saveUser
};
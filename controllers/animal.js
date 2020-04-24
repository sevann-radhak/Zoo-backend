'use strictt'

var requires = require('./requires');
var User = require('./../models/user');
var Animal = require('./../models/animal');


function pruebas(req, res) {
    res.status(200).send(new requires.Response({
        isSuccess: true,
        message: requires.CONSTANTS.BD_ERROR_404,
        result: req.user
    }));
}

module.exports = {
    pruebas
};
'use_strict'

var CONSTANTS = require('../constants/constants');
var responses = require('../controllers/responses');

exports.isAdmin = function(req, res, next) {
    if (req.user.role != CONSTANTS.ROLE_ADMIN) {
        return responses.response(res, 401);
    }

    next();
}
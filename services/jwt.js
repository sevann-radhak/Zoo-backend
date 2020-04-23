'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

exports.createToken = function(user) {
    return jwt.encode({
            sub: user._id,
            name: user.name,
            email: user.email,
            surname: user.surname,
            role: user.role,
            image: user.image,
            iat: moment().unix(),
            exp: moment().add(30, 'days').unix
        },
        require('./../constants/constants').JWT_SECRET
    );
};
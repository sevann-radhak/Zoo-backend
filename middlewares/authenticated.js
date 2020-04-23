'use strict'

var jwt = require('jwt-simple');
const CONSTANTS = require('./../constants/constants');
var moment = require('moment');
var Response = require('./../models/response')

exports.ensureAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send(new Response({
            isSuccess: false,
            message: CONSTANTS.BD_ERROR_403
        }));
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, CONSTANTS.JWT_SECRET);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send(new Response({
                isSuccess: false,
                message: 'Token has expired'
            }));
        }
    } catch (error) {
        return res.status(404).send(new Response({
            isSuccess: false,
            message: 'Token is invalid'
        }));
    }

    req.user = payload;
    next();
}
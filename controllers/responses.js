// constants
const CONSTANTS = require('./../constants/constants');
// models
var Response = require('./../models/response')

function response(res, code, result = null) {
    switch (code) {
        case 200:
            return res.status(200).send(new Response({
                isSuccess: true,
                result
            }));

        case 201:
            return res.status(201).send(new Response({
                isSuccess: true,
                result
            }));

        case 400:
            return res.status(404).send(new Response({
                isSuccess: false,
                message: CONSTANTS.BD_ERROR_400
            }));

        case 404:
            return res.status(404).send(new Response({
                isSuccess: false,
                message: CONSTANTS.BD_ERROR_404
            }));

        case 500:
            return res.status(500).send(new Response({
                isSuccess: false,
                message: CONSTANTS.BD_ERROR_500
            }));

        case 501:
            return res.status(500).send(new Response({
                isSuccess: false,
                message: CONSTANTS.BD_ERROR_501
            }));

        default:
            break;
    }
}

module.exports = {
    response
}
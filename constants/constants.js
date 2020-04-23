'use strict'

const JWT_SECRET = 'secret_key_of_sevitanns_jeje';

const BD_ERROR_403 = 'Error 403: Request needs to have the header';
const BD_ERROR_404 = 'Error 404: Record not found';
const BD_ERROR_500 = 'Error 500: Internal error in Data Base';
const BD_ERROR_501 = 'Error 500: Record not saved in Data Base';

const MODEL_INVALID = 'Data sent is invalid'

module.exports = {
    BD_ERROR_403,
    BD_ERROR_404,
    BD_ERROR_500,
    BD_ERROR_501,
    JWT_SECRET,
    MODEL_INVALID
};
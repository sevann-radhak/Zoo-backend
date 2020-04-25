'use strict'

const JWT_SECRET = 'secret_key_of_sevitanns_jeje';

const BD_ERROR_400 = 'Error 400: Bad Request';
const BD_ERROR_401 = 'Error 401: You have not permissions to perform this action';
const BD_ERROR_403 = 'Error 403: Request needs to have the header';
const BD_ERROR_404 = 'Error 404: Record not found';
const BD_ERROR_500 = 'Error 500: Internal error in Data Base';
const BD_ERROR_501 = 'Error 501: Record not saved in Data Base';

const ROLE_ADMIN = 'ROLE_ADMIN';

module.exports = {
    BD_ERROR_400,
    BD_ERROR_401,
    BD_ERROR_403,
    BD_ERROR_404,
    BD_ERROR_500,
    BD_ERROR_501,
    JWT_SECRET,
    ROLE_ADMIN
};
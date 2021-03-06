const HTTP_CONTINUE = 100;
const HTTP_PROCESSING = 102;
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202;
const HTTP_NO_DATA = 204;
const HTTP_FOUND = 302;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTORIZED = 401;
const HTTP_NOTFOUND = 404;
const HTTP_FORBIDDEN = 403;
const HTTP_UNPROCESSABLE_ENTITY=422;
const HTTP_SERVER_ERROR = 500;

const STATUS_FAILED = true;
const STATUS_SUCCESS = true;


const SERVER_FAILED_ERROR = 'SERVER_FAILED_TO_RESPONSE';
const FAILED_TO_GENERATE_TOKEN = "FAILED_TO_GENERATE_TOKEN";
const NO_USER_MATCHED ='NO_USER_MATCHED'
const AUTHENTICATION_FAILED='AUTHENTICATION_FAILED'
const UNPROCESSABLE_ENTITY='UNPROCESSABLE_ENTITY'
const BODY_CANT_BE_EMPTY='BODY_CANT_BE_EMPTY'
const SUCCESSFULLY_ADDED ='SUCCESSFULLY_ADDED'
const SUCCESSFULLY_UPDATED ='SUCCESSFULLY_UPDATED'
const SUCCESSFULLY_DELETED ='SUCCESSFULLY_DELETED'
const NO_DATA_FOUND="NO_DATA_FOUND"
module.exports = {
    HTTP_CONTINUE,
    HTTP_PROCESSING,
    HTTP_OK,
    HTTP_CREATED,
    HTTP_ACCEPTED,
    HTTP_NO_DATA,
    HTTP_FOUND,
    HTTP_BAD_REQUEST,
    HTTP_UNAUTORIZED,
    HTTP_NOTFOUND,
    HTTP_FORBIDDEN,
    HTTP_SERVER_ERROR,
    SERVER_FAILED_ERROR,
    FAILED_TO_GENERATE_TOKEN,
    NO_USER_MATCHED,
    STATUS_FAILED,
    STATUS_SUCCESS,
    AUTHENTICATION_FAILED,
    HTTP_UNPROCESSABLE_ENTITY,
    UNPROCESSABLE_ENTITY,
    BODY_CANT_BE_EMPTY,
    SUCCESSFULLY_ADDED,
    SUCCESSFULLY_UPDATED,
    SUCCESSFULLY_DELETED,
    NO_DATA_FOUND
}
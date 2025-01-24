/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  CLIENT_SECRET:'myjwtclientsecret',
  ADMIN_SECRET:'myjwtadminsecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = {
  User:1,
  Admin:2,
};

const PLATFORM = {
  CLIENT:1,
  ADMIN:2,
};

let LOGIN_ACCESS = {
  [USER_TYPES.User]:[PLATFORM.CLIENT],        
  [USER_TYPES.Admin]:[PLATFORM.ADMIN],        
};

const DEFAULT_USER_ROLE = 'User';

const MAX_LOGIN_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 2;   

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false
  },
  EXPIRE_TIME: 20
};

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
  DEFAULT_USER_ROLE,
};
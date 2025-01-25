/**
 * consoleController.js
 * @description : exports action methods for console.
 */

const Console = require('../../../model/console');
const consoleSchemaKey = require('../../../utils/validation/consoleValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};
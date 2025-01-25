/**
 * consoleRoutes.js
 * @description :: CRUD API routes for console
 */

const express = require('express');
const router = express.Router();
const consoleController = require('../../../controller/client/v1/consoleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;

/**
 * parameterRoutes.js
 * @description :: CRUD API routes for parameter
 */

const express = require('express');
const router = express.Router();
const parameterController = require('../../../controller/client/v1/parameterController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/parameter/list').post(auth(PLATFORM.CLIENT),checkRolePermission,parameterController.findAllParameter);
router.route('/client/api/v1/parameter/count').post(auth(PLATFORM.CLIENT),checkRolePermission,parameterController.getParameterCount);
router.route('/client/api/v1/parameter/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,parameterController.getParameter);

module.exports = router;

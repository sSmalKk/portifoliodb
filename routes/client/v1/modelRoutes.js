/**
 * modelRoutes.js
 * @description :: CRUD API routes for model
 */

const express = require('express');
const router = express.Router();
const modelController = require('../../../controller/client/v1/modelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/model/list').post(auth(PLATFORM.CLIENT),checkRolePermission,modelController.findAllModel);
router.route('/client/api/v1/model/count').post(auth(PLATFORM.CLIENT),checkRolePermission,modelController.getModelCount);
router.route('/client/api/v1/model/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,modelController.getModel);

module.exports = router;

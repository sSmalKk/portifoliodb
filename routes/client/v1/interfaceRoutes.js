/**
 * interfaceRoutes.js
 * @description :: CRUD API routes for interface
 */

const express = require('express');
const router = express.Router();
const interfaceController = require('../../../controller/client/v1/interfaceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/interface/list').post(auth(PLATFORM.CLIENT),checkRolePermission,interfaceController.findAllInterface);
router.route('/client/api/v1/interface/count').post(auth(PLATFORM.CLIENT),checkRolePermission,interfaceController.getInterfaceCount);
router.route('/client/api/v1/interface/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,interfaceController.getInterface);

module.exports = router;

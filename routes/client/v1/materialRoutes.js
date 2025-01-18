/**
 * materialRoutes.js
 * @description :: CRUD API routes for material
 */

const express = require('express');
const router = express.Router();
const materialController = require('../../../controller/client/v1/materialController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/material/list').post(auth(PLATFORM.CLIENT),checkRolePermission,materialController.findAllMaterial);
router.route('/client/api/v1/material/count').post(auth(PLATFORM.CLIENT),checkRolePermission,materialController.getMaterialCount);
router.route('/client/api/v1/material/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,materialController.getMaterial);

module.exports = router;

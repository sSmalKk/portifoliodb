/**
 * sizeRoutes.js
 * @description :: CRUD API routes for size
 */

const express = require('express');
const router = express.Router();
const sizeController = require('../../../controller/client/v1/sizeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/size/list').post(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.findAllSize);
router.route('/client/api/v1/size/count').post(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.getSizeCount);
router.route('/client/api/v1/size/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.getSize);

module.exports = router;

/**
 * partRoutes.js
 * @description :: CRUD API routes for part
 */

const express = require('express');
const router = express.Router();
const partController = require('../../../controller/client/v1/partController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/part/list').post(auth(PLATFORM.CLIENT),checkRolePermission,partController.findAllPart);
router.route('/client/api/v1/part/count').post(auth(PLATFORM.CLIENT),checkRolePermission,partController.getPartCount);
router.route('/client/api/v1/part/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,partController.getPart);

module.exports = router;

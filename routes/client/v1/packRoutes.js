/**
 * packRoutes.js
 * @description :: CRUD API routes for pack
 */

const express = require('express');
const router = express.Router();
const packController = require('../../../controller/client/v1/packController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/pack/list').post(auth(PLATFORM.CLIENT),checkRolePermission,packController.findAllPack);
router.route('/client/api/v1/pack/count').post(auth(PLATFORM.CLIENT),checkRolePermission,packController.getPackCount);
router.route('/client/api/v1/pack/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,packController.getPack);

module.exports = router;

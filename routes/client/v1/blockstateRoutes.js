/**
 * blockstateRoutes.js
 * @description :: CRUD API routes for blockstate
 */

const express = require('express');
const router = express.Router();
const blockstateController = require('../../../controller/client/v1/blockstateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/blockstate/list').post(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.findAllBlockstate);
router.route('/client/api/v1/blockstate/count').post(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.getBlockstateCount);
router.route('/client/api/v1/blockstate/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.getBlockstate);

module.exports = router;

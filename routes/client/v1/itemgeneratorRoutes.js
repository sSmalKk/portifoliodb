/**
 * itemgeneratorRoutes.js
 * @description :: CRUD API routes for itemgenerator
 */

const express = require('express');
const router = express.Router();
const itemgeneratorController = require('../../../controller/client/v1/itemgeneratorController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/itemgenerator/list').post(auth(PLATFORM.CLIENT),checkRolePermission,itemgeneratorController.findAllItemgenerator);
router.route('/client/api/v1/itemgenerator/count').post(auth(PLATFORM.CLIENT),checkRolePermission,itemgeneratorController.getItemgeneratorCount);
router.route('/client/api/v1/itemgenerator/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,itemgeneratorController.getItemgenerator);

module.exports = router;

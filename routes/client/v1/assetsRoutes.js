/**
 * assetsRoutes.js
 * @description :: CRUD API routes for assets
 */

const express = require('express');
const router = express.Router();
const assetsController = require('../../../controller/client/v1/assetsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/assets/list').post(auth(PLATFORM.CLIENT),checkRolePermission,assetsController.findAllAssets);
router.route('/client/api/v1/assets/count').post(auth(PLATFORM.CLIENT),checkRolePermission,assetsController.getAssetsCount);
router.route('/client/api/v1/assets/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,assetsController.getAssets);

module.exports = router;

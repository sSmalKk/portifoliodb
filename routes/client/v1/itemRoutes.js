/**
 * itemRoutes.js
 * @description :: CRUD API routes for item
 */

const express = require('express');
const router = express.Router();
const itemController = require('../../../controller/client/v1/itemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/item/list').post(auth(PLATFORM.CLIENT),checkRolePermission,itemController.findAllItem);
router.route('/client/api/v1/item/count').post(auth(PLATFORM.CLIENT),checkRolePermission,itemController.getItemCount);
router.route('/client/api/v1/item/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,itemController.getItem);

module.exports = router;

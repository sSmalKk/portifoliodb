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

router.route('/client/api/v1/item/create').post(auth(PLATFORM.CLIENT),checkRolePermission,itemController.addItem);
router.route('/client/api/v1/item/list').post(auth(PLATFORM.CLIENT),checkRolePermission,itemController.findAllItem);
router.route('/client/api/v1/item/count').post(auth(PLATFORM.CLIENT),checkRolePermission,itemController.getItemCount);
router.route('/client/api/v1/item/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,itemController.getItem);
router.route('/client/api/v1/item/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,itemController.updateItem);    
router.route('/client/api/v1/item/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,itemController.partialUpdateItem);
router.route('/client/api/v1/item/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,itemController.softDeleteItem);
router.route('/client/api/v1/item/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,itemController.softDeleteManyItem);
router.route('/client/api/v1/item/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,itemController.bulkInsertItem);
router.route('/client/api/v1/item/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,itemController.bulkUpdateItem);
router.route('/client/api/v1/item/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,itemController.deleteItem);
router.route('/client/api/v1/item/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,itemController.deleteManyItem);

module.exports = router;

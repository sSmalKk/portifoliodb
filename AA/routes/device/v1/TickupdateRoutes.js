/**
 * TickupdateRoutes.js
 * @description :: CRUD API routes for Tickupdate
 */

const express = require('express');
const router = express.Router();
const TickupdateController = require('../../../controller/device/v1/TickupdateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/tickupdate/create').post(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.addTickupdate);
router.route('/device/api/v1/tickupdate/list').post(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.findAllTickupdate);
router.route('/device/api/v1/tickupdate/count').post(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.getTickupdateCount);
router.route('/device/api/v1/tickupdate/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.getTickupdate);
router.route('/device/api/v1/tickupdate/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.updateTickupdate);    
router.route('/device/api/v1/tickupdate/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.partialUpdateTickupdate);
router.route('/device/api/v1/tickupdate/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.softDeleteTickupdate);
router.route('/device/api/v1/tickupdate/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.softDeleteManyTickupdate);
router.route('/device/api/v1/tickupdate/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.bulkInsertTickupdate);
router.route('/device/api/v1/tickupdate/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.bulkUpdateTickupdate);
router.route('/device/api/v1/tickupdate/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.deleteTickupdate);
router.route('/device/api/v1/tickupdate/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,TickupdateController.deleteManyTickupdate);

module.exports = router;

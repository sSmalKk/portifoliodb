/**
 * TickupdateRoutes.js
 * @description :: CRUD API routes for Tickupdate
 */

const express = require('express');
const router = express.Router();
const TickupdateController = require('../../../controller/client/v1/TickupdateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/tickupdate/create').post(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.addTickupdate);
router.route('/client/api/v1/tickupdate/list').post(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.findAllTickupdate);
router.route('/client/api/v1/tickupdate/count').post(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.getTickupdateCount);
router.route('/client/api/v1/tickupdate/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.getTickupdate);
router.route('/client/api/v1/tickupdate/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.updateTickupdate);    
router.route('/client/api/v1/tickupdate/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.partialUpdateTickupdate);
router.route('/client/api/v1/tickupdate/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.softDeleteTickupdate);
router.route('/client/api/v1/tickupdate/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.softDeleteManyTickupdate);
router.route('/client/api/v1/tickupdate/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.bulkInsertTickupdate);
router.route('/client/api/v1/tickupdate/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.bulkUpdateTickupdate);
router.route('/client/api/v1/tickupdate/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.deleteTickupdate);
router.route('/client/api/v1/tickupdate/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,TickupdateController.deleteManyTickupdate);

module.exports = router;

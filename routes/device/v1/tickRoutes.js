/**
 * tickRoutes.js
 * @description :: CRUD API routes for tick
 */

const express = require('express');
const router = express.Router();
const tickController = require('../../../controller/device/v1/tickController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/tick/create').post(auth(PLATFORM.DEVICE),checkRolePermission,tickController.addTick);
router.route('/device/api/v1/tick/list').post(auth(PLATFORM.DEVICE),checkRolePermission,tickController.findAllTick);
router.route('/device/api/v1/tick/count').post(auth(PLATFORM.DEVICE),checkRolePermission,tickController.getTickCount);
router.route('/device/api/v1/tick/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,tickController.getTick);
router.route('/device/api/v1/tick/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tickController.updateTick);    
router.route('/device/api/v1/tick/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tickController.partialUpdateTick);
router.route('/device/api/v1/tick/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tickController.softDeleteTick);
router.route('/device/api/v1/tick/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,tickController.softDeleteManyTick);
router.route('/device/api/v1/tick/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,tickController.bulkInsertTick);
router.route('/device/api/v1/tick/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,tickController.bulkUpdateTick);
router.route('/device/api/v1/tick/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,tickController.deleteTick);
router.route('/device/api/v1/tick/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,tickController.deleteManyTick);

module.exports = router;

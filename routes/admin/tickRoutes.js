/**
 * tickRoutes.js
 * @description :: CRUD API routes for tick
 */

const express = require('express');
const router = express.Router();
const tickController = require('../../controller/admin/tickController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/tick/create').post(auth(PLATFORM.ADMIN),checkRolePermission,tickController.addTick);
router.route('/admin/tick/list').post(auth(PLATFORM.ADMIN),checkRolePermission,tickController.findAllTick);
router.route('/admin/tick/count').post(auth(PLATFORM.ADMIN),checkRolePermission,tickController.getTickCount);
router.route('/admin/tick/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,tickController.getTick);
router.route('/admin/tick/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tickController.updateTick);    
router.route('/admin/tick/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tickController.partialUpdateTick);
router.route('/admin/tick/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tickController.softDeleteTick);
router.route('/admin/tick/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,tickController.softDeleteManyTick);
router.route('/admin/tick/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,tickController.bulkInsertTick);
router.route('/admin/tick/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,tickController.bulkUpdateTick);
router.route('/admin/tick/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,tickController.deleteTick);
router.route('/admin/tick/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,tickController.deleteManyTick);

module.exports = router;

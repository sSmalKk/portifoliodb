/**
 * tickRoutes.js
 * @description :: CRUD API routes for tick
 */

const express = require('express');
const router = express.Router();
const tickController = require('../../../controller/client/v1/tickController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/tick/create').post(auth(PLATFORM.CLIENT),checkRolePermission,tickController.addTick);
router.route('/client/api/v1/tick/list').post(auth(PLATFORM.CLIENT),checkRolePermission,tickController.findAllTick);
router.route('/client/api/v1/tick/count').post(auth(PLATFORM.CLIENT),checkRolePermission,tickController.getTickCount);
router.route('/client/api/v1/tick/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,tickController.getTick);
router.route('/client/api/v1/tick/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tickController.updateTick);    
router.route('/client/api/v1/tick/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tickController.partialUpdateTick);
router.route('/client/api/v1/tick/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tickController.softDeleteTick);
router.route('/client/api/v1/tick/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,tickController.softDeleteManyTick);
router.route('/client/api/v1/tick/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,tickController.bulkInsertTick);
router.route('/client/api/v1/tick/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,tickController.bulkUpdateTick);
router.route('/client/api/v1/tick/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,tickController.deleteTick);
router.route('/client/api/v1/tick/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,tickController.deleteManyTick);

module.exports = router;

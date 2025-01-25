/**
 * turtleparameterRoutes.js
 * @description :: CRUD API routes for turtleparameter
 */

const express = require('express');
const router = express.Router();
const turtleparameterController = require('../../controller/admin/turtleparameterController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/turtleparameter/create').post(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.addTurtleparameter);
router.route('/admin/turtleparameter/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.bulkInsertTurtleparameter);
router.route('/admin/turtleparameter/list').post(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.findAllTurtleparameter);
router.route('/admin/turtleparameter/count').post(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.getTurtleparameterCount);
router.route('/admin/turtleparameter/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.getTurtleparameter);
router.route('/admin/turtleparameter/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.updateTurtleparameter);    
router.route('/admin/turtleparameter/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.partialUpdateTurtleparameter);
router.route('/admin/turtleparameter/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.bulkUpdateTurtleparameter);
router.route('/admin/turtleparameter/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.softDeleteTurtleparameter);
router.route('/admin/turtleparameter/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.softDeleteManyTurtleparameter);
router.route('/admin/turtleparameter/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.deleteTurtleparameter);
router.route('/admin/turtleparameter/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,turtleparameterController.deleteManyTurtleparameter);

module.exports = router;

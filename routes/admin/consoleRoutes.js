/**
 * consoleRoutes.js
 * @description :: CRUD API routes for console
 */

const express = require('express');
const router = express.Router();
const consoleController = require('../../controller/admin/consoleController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/console/create').post(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.addConsole);
router.route('/admin/console/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.bulkInsertConsole);
router.route('/admin/console/list').post(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.findAllConsole);
router.route('/admin/console/count').post(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.getConsoleCount);
router.route('/admin/console/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.getConsole);
router.route('/admin/console/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.updateConsole);    
router.route('/admin/console/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.partialUpdateConsole);
router.route('/admin/console/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.bulkUpdateConsole);
router.route('/admin/console/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.softDeleteConsole);
router.route('/admin/console/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.softDeleteManyConsole);
router.route('/admin/console/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.deleteConsole);
router.route('/admin/console/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,consoleController.deleteManyConsole);

module.exports = router;

/**
 * ServerRoutes.js
 * @description :: CRUD API routes for Server
 */

const express = require('express');
const router = express.Router();
const ServerController = require('../../controller/admin/ServerController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/server/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.addServer);
router.route('/admin/server/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.findAllServer);
router.route('/admin/server/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.getServerCount);
router.route('/admin/server/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.getServer);
router.route('/admin/server/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.updateServer);    
router.route('/admin/server/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.partialUpdateServer);
router.route('/admin/server/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.softDeleteServer);
router.route('/admin/server/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.softDeleteManyServer);
router.route('/admin/server/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.bulkInsertServer);
router.route('/admin/server/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.bulkUpdateServer);
router.route('/admin/server/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.deleteServer);
router.route('/admin/server/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ServerController.deleteManyServer);

module.exports = router;

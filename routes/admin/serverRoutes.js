/**
 * serverRoutes.js
 * @description :: CRUD API routes for server
 */

const express = require('express');
const router = express.Router();
const serverController = require('../../controller/admin/serverController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/server/create').post(auth(PLATFORM.ADMIN),checkRolePermission,serverController.addServer);
router.route('/admin/server/list').post(auth(PLATFORM.ADMIN),checkRolePermission,serverController.findAllServer);
router.route('/admin/server/count').post(auth(PLATFORM.ADMIN),checkRolePermission,serverController.getServerCount);
router.route('/admin/server/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,serverController.getServer);
router.route('/admin/server/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,serverController.updateServer);    
router.route('/admin/server/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,serverController.partialUpdateServer);
router.route('/admin/server/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,serverController.softDeleteServer);
router.route('/admin/server/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,serverController.softDeleteManyServer);
router.route('/admin/server/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,serverController.bulkInsertServer);
router.route('/admin/server/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,serverController.bulkUpdateServer);
router.route('/admin/server/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,serverController.deleteServer);
router.route('/admin/server/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,serverController.deleteManyServer);

module.exports = router;

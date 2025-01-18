/**
 * serverRoutes.js
 * @description :: CRUD API routes for server
 */

const express = require('express');
const router = express.Router();
const serverController = require('../../../controller/device/v1/serverController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/server/create').post(auth(PLATFORM.DEVICE),checkRolePermission,serverController.addServer);
router.route('/device/api/v1/server/list').post(auth(PLATFORM.DEVICE),checkRolePermission,serverController.findAllServer);
router.route('/device/api/v1/server/count').post(auth(PLATFORM.DEVICE),checkRolePermission,serverController.getServerCount);
router.route('/device/api/v1/server/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,serverController.getServer);
router.route('/device/api/v1/server/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,serverController.updateServer);    
router.route('/device/api/v1/server/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,serverController.partialUpdateServer);
router.route('/device/api/v1/server/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,serverController.softDeleteServer);
router.route('/device/api/v1/server/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,serverController.softDeleteManyServer);
router.route('/device/api/v1/server/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,serverController.bulkInsertServer);
router.route('/device/api/v1/server/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,serverController.bulkUpdateServer);
router.route('/device/api/v1/server/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,serverController.deleteServer);
router.route('/device/api/v1/server/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,serverController.deleteManyServer);

module.exports = router;

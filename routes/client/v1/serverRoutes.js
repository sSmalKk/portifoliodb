/**
 * serverRoutes.js
 * @description :: CRUD API routes for server
 */

const express = require('express');
const router = express.Router();
const serverController = require('../../../controller/client/v1/serverController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/server/create').post(auth(PLATFORM.CLIENT),checkRolePermission,serverController.addServer);
router.route('/client/api/v1/server/list').post(auth(PLATFORM.CLIENT),checkRolePermission,serverController.findAllServer);
router.route('/client/api/v1/server/count').post(auth(PLATFORM.CLIENT),checkRolePermission,serverController.getServerCount);
router.route('/client/api/v1/server/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,serverController.getServer);
router.route('/client/api/v1/server/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,serverController.updateServer);    
router.route('/client/api/v1/server/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,serverController.partialUpdateServer);
router.route('/client/api/v1/server/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,serverController.softDeleteServer);
router.route('/client/api/v1/server/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,serverController.softDeleteManyServer);
router.route('/client/api/v1/server/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,serverController.bulkInsertServer);
router.route('/client/api/v1/server/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,serverController.bulkUpdateServer);
router.route('/client/api/v1/server/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,serverController.deleteServer);
router.route('/client/api/v1/server/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,serverController.deleteManyServer);

module.exports = router;

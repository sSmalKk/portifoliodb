/**
 * ServerRoutes.js
 * @description :: CRUD API routes for Server
 */

const express = require('express');
const router = express.Router();
const ServerController = require('../../../controller/client/v1/ServerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/server/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.addServer);
router.route('/client/api/v1/server/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.findAllServer);
router.route('/client/api/v1/server/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.getServerCount);
router.route('/client/api/v1/server/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.getServer);
router.route('/client/api/v1/server/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.updateServer);    
router.route('/client/api/v1/server/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.partialUpdateServer);
router.route('/client/api/v1/server/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.softDeleteServer);
router.route('/client/api/v1/server/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.softDeleteManyServer);
router.route('/client/api/v1/server/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.bulkInsertServer);
router.route('/client/api/v1/server/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.bulkUpdateServer);
router.route('/client/api/v1/server/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.deleteServer);
router.route('/client/api/v1/server/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ServerController.deleteManyServer);

module.exports = router;

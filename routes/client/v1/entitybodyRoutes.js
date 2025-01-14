/**
 * entitybodyRoutes.js
 * @description :: CRUD API routes for entitybody
 */

const express = require('express');
const router = express.Router();
const entitybodyController = require('../../../controller/client/v1/entitybodyController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/entitybody/create').post(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.addEntitybody);
router.route('/client/api/v1/entitybody/list').post(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.findAllEntitybody);
router.route('/client/api/v1/entitybody/count').post(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.getEntitybodyCount);
router.route('/client/api/v1/entitybody/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.getEntitybody);
router.route('/client/api/v1/entitybody/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.updateEntitybody);    
router.route('/client/api/v1/entitybody/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.partialUpdateEntitybody);
router.route('/client/api/v1/entitybody/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.softDeleteEntitybody);
router.route('/client/api/v1/entitybody/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.softDeleteManyEntitybody);
router.route('/client/api/v1/entitybody/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.bulkInsertEntitybody);
router.route('/client/api/v1/entitybody/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.bulkUpdateEntitybody);
router.route('/client/api/v1/entitybody/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.deleteEntitybody);
router.route('/client/api/v1/entitybody/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,entitybodyController.deleteManyEntitybody);

module.exports = router;

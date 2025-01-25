/**
 * EntityBodyRoutes.js
 * @description :: CRUD API routes for EntityBody
 */

const express = require('express');
const router = express.Router();
const EntityBodyController = require('../../../controller/client/v1/EntityBodyController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/entitybody/create').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.addEntityBody);
router.route('/client/api/v1/entitybody/list').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.findAllEntityBody);
router.route('/client/api/v1/entitybody/count').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.getEntityBodyCount);
router.route('/client/api/v1/entitybody/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.getEntityBody);
router.route('/client/api/v1/entitybody/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.updateEntityBody);    
router.route('/client/api/v1/entitybody/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.partialUpdateEntityBody);
router.route('/client/api/v1/entitybody/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.softDeleteEntityBody);
router.route('/client/api/v1/entitybody/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.softDeleteManyEntityBody);
router.route('/client/api/v1/entitybody/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.bulkInsertEntityBody);
router.route('/client/api/v1/entitybody/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.bulkUpdateEntityBody);
router.route('/client/api/v1/entitybody/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.deleteEntityBody);
router.route('/client/api/v1/entitybody/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityBodyController.deleteManyEntityBody);

module.exports = router;

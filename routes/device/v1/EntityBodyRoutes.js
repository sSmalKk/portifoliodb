/**
 * EntityBodyRoutes.js
 * @description :: CRUD API routes for EntityBody
 */

const express = require('express');
const router = express.Router();
const EntityBodyController = require('../../../controller/device/v1/EntityBodyController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/entitybody/create').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.addEntityBody);
router.route('/device/api/v1/entitybody/list').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.findAllEntityBody);
router.route('/device/api/v1/entitybody/count').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.getEntityBodyCount);
router.route('/device/api/v1/entitybody/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.getEntityBody);
router.route('/device/api/v1/entitybody/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.updateEntityBody);    
router.route('/device/api/v1/entitybody/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.partialUpdateEntityBody);
router.route('/device/api/v1/entitybody/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.softDeleteEntityBody);
router.route('/device/api/v1/entitybody/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.softDeleteManyEntityBody);
router.route('/device/api/v1/entitybody/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.bulkInsertEntityBody);
router.route('/device/api/v1/entitybody/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.bulkUpdateEntityBody);
router.route('/device/api/v1/entitybody/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.deleteEntityBody);
router.route('/device/api/v1/entitybody/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityBodyController.deleteManyEntityBody);

module.exports = router;

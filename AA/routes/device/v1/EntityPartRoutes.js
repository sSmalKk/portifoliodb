/**
 * EntityPartRoutes.js
 * @description :: CRUD API routes for EntityPart
 */

const express = require('express');
const router = express.Router();
const EntityPartController = require('../../../controller/device/v1/EntityPartController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/entitypart/create').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.addEntityPart);
router.route('/device/api/v1/entitypart/list').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.findAllEntityPart);
router.route('/device/api/v1/entitypart/count').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.getEntityPartCount);
router.route('/device/api/v1/entitypart/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.getEntityPart);
router.route('/device/api/v1/entitypart/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.updateEntityPart);    
router.route('/device/api/v1/entitypart/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.partialUpdateEntityPart);
router.route('/device/api/v1/entitypart/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.softDeleteEntityPart);
router.route('/device/api/v1/entitypart/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.softDeleteManyEntityPart);
router.route('/device/api/v1/entitypart/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.bulkInsertEntityPart);
router.route('/device/api/v1/entitypart/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.bulkUpdateEntityPart);
router.route('/device/api/v1/entitypart/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.deleteEntityPart);
router.route('/device/api/v1/entitypart/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,EntityPartController.deleteManyEntityPart);

module.exports = router;

/**
 * EntityPartRoutes.js
 * @description :: CRUD API routes for EntityPart
 */

const express = require('express');
const router = express.Router();
const EntityPartController = require('../../../controller/client/v1/EntityPartController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/entitypart/create').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.addEntityPart);
router.route('/client/api/v1/entitypart/list').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.findAllEntityPart);
router.route('/client/api/v1/entitypart/count').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.getEntityPartCount);
router.route('/client/api/v1/entitypart/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.getEntityPart);
router.route('/client/api/v1/entitypart/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.updateEntityPart);    
router.route('/client/api/v1/entitypart/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.partialUpdateEntityPart);
router.route('/client/api/v1/entitypart/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.softDeleteEntityPart);
router.route('/client/api/v1/entitypart/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.softDeleteManyEntityPart);
router.route('/client/api/v1/entitypart/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.bulkInsertEntityPart);
router.route('/client/api/v1/entitypart/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.bulkUpdateEntityPart);
router.route('/client/api/v1/entitypart/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.deleteEntityPart);
router.route('/client/api/v1/entitypart/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityPartController.deleteManyEntityPart);

module.exports = router;

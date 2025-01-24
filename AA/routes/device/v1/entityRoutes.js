/**
 * entityRoutes.js
 * @description :: CRUD API routes for entity
 */

const express = require('express');
const router = express.Router();
const entityController = require('../../../controller/device/v1/entityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/entity/create').post(auth(PLATFORM.DEVICE),checkRolePermission,entityController.addEntity);
router.route('/device/api/v1/entity/list').post(auth(PLATFORM.DEVICE),checkRolePermission,entityController.findAllEntity);
router.route('/device/api/v1/entity/count').post(auth(PLATFORM.DEVICE),checkRolePermission,entityController.getEntityCount);
router.route('/device/api/v1/entity/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,entityController.getEntity);
router.route('/device/api/v1/entity/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,entityController.updateEntity);    
router.route('/device/api/v1/entity/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,entityController.partialUpdateEntity);
router.route('/device/api/v1/entity/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,entityController.softDeleteEntity);
router.route('/device/api/v1/entity/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,entityController.softDeleteManyEntity);
router.route('/device/api/v1/entity/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,entityController.bulkInsertEntity);
router.route('/device/api/v1/entity/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,entityController.bulkUpdateEntity);
router.route('/device/api/v1/entity/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,entityController.deleteEntity);
router.route('/device/api/v1/entity/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,entityController.deleteManyEntity);

module.exports = router;

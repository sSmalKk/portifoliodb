/**
 * entityRoutes.js
 * @description :: CRUD API routes for entity
 */

const express = require('express');
const router = express.Router();
const entityController = require('../../../controller/client/v1/entityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/entity/create').post(auth(PLATFORM.CLIENT),checkRolePermission,entityController.addEntity);
router.route('/client/api/v1/entity/list').post(auth(PLATFORM.CLIENT),checkRolePermission,entityController.findAllEntity);
router.route('/client/api/v1/entity/count').post(auth(PLATFORM.CLIENT),checkRolePermission,entityController.getEntityCount);
router.route('/client/api/v1/entity/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,entityController.getEntity);
router.route('/client/api/v1/entity/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,entityController.updateEntity);    
router.route('/client/api/v1/entity/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,entityController.partialUpdateEntity);
router.route('/client/api/v1/entity/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,entityController.softDeleteEntity);
router.route('/client/api/v1/entity/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,entityController.softDeleteManyEntity);
router.route('/client/api/v1/entity/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,entityController.bulkInsertEntity);
router.route('/client/api/v1/entity/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,entityController.bulkUpdateEntity);
router.route('/client/api/v1/entity/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,entityController.deleteEntity);
router.route('/client/api/v1/entity/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,entityController.deleteManyEntity);

module.exports = router;

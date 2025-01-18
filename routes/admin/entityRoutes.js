/**
 * entityRoutes.js
 * @description :: CRUD API routes for entity
 */

const express = require('express');
const router = express.Router();
const entityController = require('../../controller/admin/entityController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/entity/create').post(auth(PLATFORM.ADMIN),checkRolePermission,entityController.addEntity);
router.route('/admin/entity/list').post(auth(PLATFORM.ADMIN),checkRolePermission,entityController.findAllEntity);
router.route('/admin/entity/count').post(auth(PLATFORM.ADMIN),checkRolePermission,entityController.getEntityCount);
router.route('/admin/entity/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,entityController.getEntity);
router.route('/admin/entity/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,entityController.updateEntity);    
router.route('/admin/entity/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,entityController.partialUpdateEntity);
router.route('/admin/entity/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,entityController.softDeleteEntity);
router.route('/admin/entity/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,entityController.softDeleteManyEntity);
router.route('/admin/entity/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,entityController.bulkInsertEntity);
router.route('/admin/entity/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,entityController.bulkUpdateEntity);
router.route('/admin/entity/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,entityController.deleteEntity);
router.route('/admin/entity/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,entityController.deleteManyEntity);

module.exports = router;

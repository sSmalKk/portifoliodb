/**
 * entitybodyRoutes.js
 * @description :: CRUD API routes for entitybody
 */

const express = require('express');
const router = express.Router();
const entitybodyController = require('../../controller/admin/entitybodyController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/entitybody/create').post(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.addEntitybody);
router.route('/admin/entitybody/list').post(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.findAllEntitybody);
router.route('/admin/entitybody/count').post(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.getEntitybodyCount);
router.route('/admin/entitybody/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.getEntitybody);
router.route('/admin/entitybody/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.updateEntitybody);    
router.route('/admin/entitybody/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.partialUpdateEntitybody);
router.route('/admin/entitybody/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.softDeleteEntitybody);
router.route('/admin/entitybody/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.softDeleteManyEntitybody);
router.route('/admin/entitybody/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.bulkInsertEntitybody);
router.route('/admin/entitybody/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.bulkUpdateEntitybody);
router.route('/admin/entitybody/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.deleteEntitybody);
router.route('/admin/entitybody/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,entitybodyController.deleteManyEntitybody);

module.exports = router;

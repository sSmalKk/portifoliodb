/**
 * materialRoutes.js
 * @description :: CRUD API routes for material
 */

const express = require('express');
const router = express.Router();
const materialController = require('../../controller/admin/materialController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/material/create').post(auth(PLATFORM.ADMIN),checkRolePermission,materialController.addMaterial);
router.route('/admin/material/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,materialController.bulkInsertMaterial);
router.route('/admin/material/list').post(auth(PLATFORM.ADMIN),checkRolePermission,materialController.findAllMaterial);
router.route('/admin/material/count').post(auth(PLATFORM.ADMIN),checkRolePermission,materialController.getMaterialCount);
router.route('/admin/material/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,materialController.getMaterial);
router.route('/admin/material/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,materialController.updateMaterial);    
router.route('/admin/material/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,materialController.partialUpdateMaterial);
router.route('/admin/material/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,materialController.bulkUpdateMaterial);
router.route('/admin/material/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,materialController.softDeleteMaterial);
router.route('/admin/material/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,materialController.softDeleteManyMaterial);
router.route('/admin/material/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,materialController.deleteMaterial);
router.route('/admin/material/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,materialController.deleteManyMaterial);

module.exports = router;

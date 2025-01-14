/**
 * OrganRoutes.js
 * @description :: CRUD API routes for Organ
 */

const express = require('express');
const router = express.Router();
const OrganController = require('../../controller/admin/OrganController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/organ/create').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.addOrgan);
router.route('/admin/organ/list').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.findAllOrgan);
router.route('/admin/organ/count').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.getOrganCount);
router.route('/admin/organ/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.getOrgan);
router.route('/admin/organ/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.updateOrgan);    
router.route('/admin/organ/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.partialUpdateOrgan);
router.route('/admin/organ/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.softDeleteOrgan);
router.route('/admin/organ/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.softDeleteManyOrgan);
router.route('/admin/organ/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.bulkInsertOrgan);
router.route('/admin/organ/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.bulkUpdateOrgan);
router.route('/admin/organ/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.deleteOrgan);
router.route('/admin/organ/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganController.deleteManyOrgan);

module.exports = router;

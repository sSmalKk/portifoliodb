/**
 * OrganRoutes.js
 * @description :: CRUD API routes for Organ
 */

const express = require('express');
const router = express.Router();
const OrganController = require('../../../controller/client/v1/OrganController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/organ/create').post(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.addOrgan);
router.route('/client/api/v1/organ/list').post(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.findAllOrgan);
router.route('/client/api/v1/organ/count').post(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.getOrganCount);
router.route('/client/api/v1/organ/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.getOrgan);
router.route('/client/api/v1/organ/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.updateOrgan);    
router.route('/client/api/v1/organ/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.partialUpdateOrgan);
router.route('/client/api/v1/organ/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.softDeleteOrgan);
router.route('/client/api/v1/organ/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.softDeleteManyOrgan);
router.route('/client/api/v1/organ/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.bulkInsertOrgan);
router.route('/client/api/v1/organ/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.bulkUpdateOrgan);
router.route('/client/api/v1/organ/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.deleteOrgan);
router.route('/client/api/v1/organ/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,OrganController.deleteManyOrgan);

module.exports = router;

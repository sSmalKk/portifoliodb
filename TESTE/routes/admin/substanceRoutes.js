/**
 * substanceRoutes.js
 * @description :: CRUD API routes for substance
 */

const express = require('express');
const router = express.Router();
const substanceController = require('../../controller/admin/substanceController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/substance/create').post(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.addSubstance);
router.route('/admin/substance/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.bulkInsertSubstance);
router.route('/admin/substance/list').post(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.findAllSubstance);
router.route('/admin/substance/count').post(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.getSubstanceCount);
router.route('/admin/substance/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.getSubstance);
router.route('/admin/substance/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.updateSubstance);    
router.route('/admin/substance/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.partialUpdateSubstance);
router.route('/admin/substance/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.bulkUpdateSubstance);
router.route('/admin/substance/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.softDeleteSubstance);
router.route('/admin/substance/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.softDeleteManySubstance);
router.route('/admin/substance/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.deleteSubstance);
router.route('/admin/substance/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,substanceController.deleteManySubstance);

module.exports = router;

/**
 * partRoutes.js
 * @description :: CRUD API routes for part
 */

const express = require('express');
const router = express.Router();
const partController = require('../../controller/admin/partController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/part/create').post(auth(PLATFORM.ADMIN),checkRolePermission,partController.addPart);
router.route('/admin/part/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,partController.bulkInsertPart);
router.route('/admin/part/list').post(auth(PLATFORM.ADMIN),checkRolePermission,partController.findAllPart);
router.route('/admin/part/count').post(auth(PLATFORM.ADMIN),checkRolePermission,partController.getPartCount);
router.route('/admin/part/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,partController.getPart);
router.route('/admin/part/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,partController.updatePart);    
router.route('/admin/part/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,partController.partialUpdatePart);
router.route('/admin/part/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,partController.bulkUpdatePart);
router.route('/admin/part/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,partController.softDeletePart);
router.route('/admin/part/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,partController.softDeleteManyPart);
router.route('/admin/part/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,partController.deletePart);
router.route('/admin/part/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,partController.deleteManyPart);

module.exports = router;

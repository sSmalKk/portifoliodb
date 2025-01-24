/**
 * interfaceRoutes.js
 * @description :: CRUD API routes for interface
 */

const express = require('express');
const router = express.Router();
const interfaceController = require('../../controller/admin/interfaceController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/interface/create').post(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.addInterface);
router.route('/admin/interface/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.bulkInsertInterface);
router.route('/admin/interface/list').post(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.findAllInterface);
router.route('/admin/interface/count').post(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.getInterfaceCount);
router.route('/admin/interface/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.getInterface);
router.route('/admin/interface/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.updateInterface);    
router.route('/admin/interface/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.partialUpdateInterface);
router.route('/admin/interface/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.bulkUpdateInterface);
router.route('/admin/interface/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.softDeleteInterface);
router.route('/admin/interface/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.softDeleteManyInterface);
router.route('/admin/interface/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.deleteInterface);
router.route('/admin/interface/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,interfaceController.deleteManyInterface);

module.exports = router;

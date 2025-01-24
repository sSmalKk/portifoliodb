/**
 * custommodelRoutes.js
 * @description :: CRUD API routes for custommodel
 */

const express = require('express');
const router = express.Router();
const custommodelController = require('../../controller/admin/custommodelController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/custommodel/create').post(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.addCustommodel);
router.route('/admin/custommodel/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.bulkInsertCustommodel);
router.route('/admin/custommodel/list').post(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.findAllCustommodel);
router.route('/admin/custommodel/count').post(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.getCustommodelCount);
router.route('/admin/custommodel/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.getCustommodel);
router.route('/admin/custommodel/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.updateCustommodel);    
router.route('/admin/custommodel/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.partialUpdateCustommodel);
router.route('/admin/custommodel/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.bulkUpdateCustommodel);
router.route('/admin/custommodel/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.softDeleteCustommodel);
router.route('/admin/custommodel/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.softDeleteManyCustommodel);
router.route('/admin/custommodel/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.deleteCustommodel);
router.route('/admin/custommodel/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,custommodelController.deleteManyCustommodel);

module.exports = router;

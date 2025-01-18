/**
 * sizeRoutes.js
 * @description :: CRUD API routes for size
 */

const express = require('express');
const router = express.Router();
const sizeController = require('../../controller/admin/sizeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/size/create').post(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.addSize);
router.route('/admin/size/list').post(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.findAllSize);
router.route('/admin/size/count').post(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.getSizeCount);
router.route('/admin/size/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.getSize);
router.route('/admin/size/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.updateSize);    
router.route('/admin/size/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.partialUpdateSize);
router.route('/admin/size/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.softDeleteSize);
router.route('/admin/size/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.softDeleteManySize);
router.route('/admin/size/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.bulkInsertSize);
router.route('/admin/size/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.bulkUpdateSize);
router.route('/admin/size/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.deleteSize);
router.route('/admin/size/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,sizeController.deleteManySize);

module.exports = router;

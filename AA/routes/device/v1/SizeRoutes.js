/**
 * SizeRoutes.js
 * @description :: CRUD API routes for Size
 */

const express = require('express');
const router = express.Router();
const SizeController = require('../../../controller/device/v1/SizeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/size/create').post(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.addSize);
router.route('/device/api/v1/size/list').post(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.findAllSize);
router.route('/device/api/v1/size/count').post(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.getSizeCount);
router.route('/device/api/v1/size/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.getSize);
router.route('/device/api/v1/size/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.updateSize);    
router.route('/device/api/v1/size/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.partialUpdateSize);
router.route('/device/api/v1/size/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.softDeleteSize);
router.route('/device/api/v1/size/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.softDeleteManySize);
router.route('/device/api/v1/size/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.bulkInsertSize);
router.route('/device/api/v1/size/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.bulkUpdateSize);
router.route('/device/api/v1/size/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.deleteSize);
router.route('/device/api/v1/size/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,SizeController.deleteManySize);

module.exports = router;

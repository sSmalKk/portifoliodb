/**
 * sizeRoutes.js
 * @description :: CRUD API routes for size
 */

const express = require('express');
const router = express.Router();
const sizeController = require('../../../controller/device/v1/sizeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/size/create').post(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.addSize);
router.route('/device/api/v1/size/list').post(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.findAllSize);
router.route('/device/api/v1/size/count').post(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.getSizeCount);
router.route('/device/api/v1/size/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.getSize);
router.route('/device/api/v1/size/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.updateSize);    
router.route('/device/api/v1/size/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.partialUpdateSize);
router.route('/device/api/v1/size/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.softDeleteSize);
router.route('/device/api/v1/size/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.softDeleteManySize);
router.route('/device/api/v1/size/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.bulkInsertSize);
router.route('/device/api/v1/size/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.bulkUpdateSize);
router.route('/device/api/v1/size/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.deleteSize);
router.route('/device/api/v1/size/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,sizeController.deleteManySize);

module.exports = router;

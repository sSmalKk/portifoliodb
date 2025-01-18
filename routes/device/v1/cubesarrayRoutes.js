/**
 * cubesarrayRoutes.js
 * @description :: CRUD API routes for cubesarray
 */

const express = require('express');
const router = express.Router();
const cubesarrayController = require('../../../controller/device/v1/cubesarrayController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/cubesarray/create').post(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.addCubesarray);
router.route('/device/api/v1/cubesarray/list').post(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.findAllCubesarray);
router.route('/device/api/v1/cubesarray/count').post(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.getCubesarrayCount);
router.route('/device/api/v1/cubesarray/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.getCubesarray);
router.route('/device/api/v1/cubesarray/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.updateCubesarray);    
router.route('/device/api/v1/cubesarray/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.partialUpdateCubesarray);
router.route('/device/api/v1/cubesarray/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.softDeleteCubesarray);
router.route('/device/api/v1/cubesarray/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.softDeleteManyCubesarray);
router.route('/device/api/v1/cubesarray/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.bulkInsertCubesarray);
router.route('/device/api/v1/cubesarray/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.bulkUpdateCubesarray);
router.route('/device/api/v1/cubesarray/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.deleteCubesarray);
router.route('/device/api/v1/cubesarray/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,cubesarrayController.deleteManyCubesarray);

module.exports = router;

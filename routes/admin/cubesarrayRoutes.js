/**
 * cubesarrayRoutes.js
 * @description :: CRUD API routes for cubesarray
 */

const express = require('express');
const router = express.Router();
const cubesarrayController = require('../../controller/admin/cubesarrayController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/cubesarray/create').post(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.addCubesarray);
router.route('/admin/cubesarray/list').post(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.findAllCubesarray);
router.route('/admin/cubesarray/count').post(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.getCubesarrayCount);
router.route('/admin/cubesarray/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.getCubesarray);
router.route('/admin/cubesarray/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.updateCubesarray);    
router.route('/admin/cubesarray/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.partialUpdateCubesarray);
router.route('/admin/cubesarray/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.softDeleteCubesarray);
router.route('/admin/cubesarray/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.softDeleteManyCubesarray);
router.route('/admin/cubesarray/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.bulkInsertCubesarray);
router.route('/admin/cubesarray/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.bulkUpdateCubesarray);
router.route('/admin/cubesarray/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.deleteCubesarray);
router.route('/admin/cubesarray/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,cubesarrayController.deleteManyCubesarray);

module.exports = router;

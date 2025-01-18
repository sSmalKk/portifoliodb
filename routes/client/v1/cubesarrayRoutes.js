/**
 * cubesarrayRoutes.js
 * @description :: CRUD API routes for cubesarray
 */

const express = require('express');
const router = express.Router();
const cubesarrayController = require('../../../controller/client/v1/cubesarrayController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/cubesarray/create').post(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.addCubesarray);
router.route('/client/api/v1/cubesarray/list').post(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.findAllCubesarray);
router.route('/client/api/v1/cubesarray/count').post(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.getCubesarrayCount);
router.route('/client/api/v1/cubesarray/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.getCubesarray);
router.route('/client/api/v1/cubesarray/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.updateCubesarray);    
router.route('/client/api/v1/cubesarray/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.partialUpdateCubesarray);
router.route('/client/api/v1/cubesarray/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.softDeleteCubesarray);
router.route('/client/api/v1/cubesarray/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.softDeleteManyCubesarray);
router.route('/client/api/v1/cubesarray/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.bulkInsertCubesarray);
router.route('/client/api/v1/cubesarray/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.bulkUpdateCubesarray);
router.route('/client/api/v1/cubesarray/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.deleteCubesarray);
router.route('/client/api/v1/cubesarray/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,cubesarrayController.deleteManyCubesarray);

module.exports = router;

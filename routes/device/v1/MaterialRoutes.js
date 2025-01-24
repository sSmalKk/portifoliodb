/**
 * MaterialRoutes.js
 * @description :: CRUD API routes for Material
 */

const express = require('express');
const router = express.Router();
const MaterialController = require('../../../controller/device/v1/MaterialController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/material/create').post(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.addMaterial);
router.route('/device/api/v1/material/list').post(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.findAllMaterial);
router.route('/device/api/v1/material/count').post(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.getMaterialCount);
router.route('/device/api/v1/material/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.getMaterial);
router.route('/device/api/v1/material/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.updateMaterial);    
router.route('/device/api/v1/material/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.partialUpdateMaterial);
router.route('/device/api/v1/material/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.softDeleteMaterial);
router.route('/device/api/v1/material/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.softDeleteManyMaterial);
router.route('/device/api/v1/material/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.bulkInsertMaterial);
router.route('/device/api/v1/material/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.bulkUpdateMaterial);
router.route('/device/api/v1/material/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.deleteMaterial);
router.route('/device/api/v1/material/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,MaterialController.deleteManyMaterial);

module.exports = router;

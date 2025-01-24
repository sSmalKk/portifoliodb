/**
 * packRoutes.js
 * @description :: CRUD API routes for pack
 */

const express = require('express');
const router = express.Router();
const packController = require('../../../controller/device/v1/packController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/pack/create').post(auth(PLATFORM.DEVICE),checkRolePermission,packController.addPack);
router.route('/device/api/v1/pack/list').post(auth(PLATFORM.DEVICE),checkRolePermission,packController.findAllPack);
router.route('/device/api/v1/pack/count').post(auth(PLATFORM.DEVICE),checkRolePermission,packController.getPackCount);
router.route('/device/api/v1/pack/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,packController.getPack);
router.route('/device/api/v1/pack/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,packController.updatePack);    
router.route('/device/api/v1/pack/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,packController.partialUpdatePack);
router.route('/device/api/v1/pack/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,packController.softDeletePack);
router.route('/device/api/v1/pack/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,packController.softDeleteManyPack);
router.route('/device/api/v1/pack/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,packController.bulkInsertPack);
router.route('/device/api/v1/pack/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,packController.bulkUpdatePack);
router.route('/device/api/v1/pack/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,packController.deletePack);
router.route('/device/api/v1/pack/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,packController.deleteManyPack);

module.exports = router;

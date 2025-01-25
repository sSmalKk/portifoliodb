/**
 * assetsRoutes.js
 * @description :: CRUD API routes for assets
 */

const express = require('express');
const router = express.Router();
const assetsController = require('../../controller/admin/assetsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/assets/create').post(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.addAssets);
router.route('/admin/assets/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.bulkInsertAssets);
router.route('/admin/assets/list').post(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.findAllAssets);
router.route('/admin/assets/count').post(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.getAssetsCount);
router.route('/admin/assets/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.getAssets);
router.route('/admin/assets/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.updateAssets);    
router.route('/admin/assets/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.partialUpdateAssets);
router.route('/admin/assets/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.bulkUpdateAssets);
router.route('/admin/assets/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.softDeleteAssets);
router.route('/admin/assets/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.softDeleteManyAssets);
router.route('/admin/assets/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.deleteAssets);
router.route('/admin/assets/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,assetsController.deleteManyAssets);

module.exports = router;

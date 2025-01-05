/**
 * packRoutes.js
 * @description :: CRUD API routes for pack
 */

const express = require('express');
const router = express.Router();
const packController = require('../../controller/admin/packController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/pack/create').post(auth(PLATFORM.ADMIN),checkRolePermission,packController.addPack);
router.route('/admin/pack/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,packController.bulkInsertPack);
router.route('/admin/pack/list').post(auth(PLATFORM.ADMIN),checkRolePermission,packController.findAllPack);
router.route('/admin/pack/count').post(auth(PLATFORM.ADMIN),checkRolePermission,packController.getPackCount);
router.route('/admin/pack/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,packController.getPack);
router.route('/admin/pack/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,packController.updatePack);    
router.route('/admin/pack/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,packController.partialUpdatePack);
router.route('/admin/pack/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,packController.bulkUpdatePack);
router.route('/admin/pack/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,packController.softDeletePack);
router.route('/admin/pack/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,packController.softDeleteManyPack);
router.route('/admin/pack/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,packController.deletePack);
router.route('/admin/pack/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,packController.deleteManyPack);

module.exports = router;

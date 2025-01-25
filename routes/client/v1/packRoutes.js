/**
 * packRoutes.js
 * @description :: CRUD API routes for pack
 */

const express = require('express');
const router = express.Router();
const packController = require('../../../controller/client/v1/packController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/pack/create').post(auth(PLATFORM.CLIENT),checkRolePermission,packController.addPack);
router.route('/client/api/v1/pack/list').post(auth(PLATFORM.CLIENT),checkRolePermission,packController.findAllPack);
router.route('/client/api/v1/pack/count').post(auth(PLATFORM.CLIENT),checkRolePermission,packController.getPackCount);
router.route('/client/api/v1/pack/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,packController.getPack);
router.route('/client/api/v1/pack/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,packController.updatePack);    
router.route('/client/api/v1/pack/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,packController.partialUpdatePack);
router.route('/client/api/v1/pack/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,packController.softDeletePack);
router.route('/client/api/v1/pack/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,packController.softDeleteManyPack);
router.route('/client/api/v1/pack/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,packController.bulkInsertPack);
router.route('/client/api/v1/pack/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,packController.bulkUpdatePack);
router.route('/client/api/v1/pack/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,packController.deletePack);
router.route('/client/api/v1/pack/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,packController.deleteManyPack);

module.exports = router;

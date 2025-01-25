/**
 * itemgeneratorRoutes.js
 * @description :: CRUD API routes for itemgenerator
 */

const express = require('express');
const router = express.Router();
const itemgeneratorController = require('../../controller/admin/itemgeneratorController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/itemgenerator/create').post(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.addItemgenerator);
router.route('/admin/itemgenerator/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.bulkInsertItemgenerator);
router.route('/admin/itemgenerator/list').post(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.findAllItemgenerator);
router.route('/admin/itemgenerator/count').post(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.getItemgeneratorCount);
router.route('/admin/itemgenerator/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.getItemgenerator);
router.route('/admin/itemgenerator/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.updateItemgenerator);    
router.route('/admin/itemgenerator/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.partialUpdateItemgenerator);
router.route('/admin/itemgenerator/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.bulkUpdateItemgenerator);
router.route('/admin/itemgenerator/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.softDeleteItemgenerator);
router.route('/admin/itemgenerator/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.softDeleteManyItemgenerator);
router.route('/admin/itemgenerator/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.deleteItemgenerator);
router.route('/admin/itemgenerator/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,itemgeneratorController.deleteManyItemgenerator);

module.exports = router;

/**
 * elementsRoutes.js
 * @description :: CRUD API routes for elements
 */

const express = require('express');
const router = express.Router();
const elementsController = require('../../controller/admin/elementsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/elements/create').post(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.addElements);
router.route('/admin/elements/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.bulkInsertElements);
router.route('/admin/elements/list').post(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.findAllElements);
router.route('/admin/elements/count').post(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.getElementsCount);
router.route('/admin/elements/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.getElements);
router.route('/admin/elements/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.updateElements);    
router.route('/admin/elements/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.partialUpdateElements);
router.route('/admin/elements/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.bulkUpdateElements);
router.route('/admin/elements/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.softDeleteElements);
router.route('/admin/elements/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.softDeleteManyElements);
router.route('/admin/elements/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.deleteElements);
router.route('/admin/elements/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,elementsController.deleteManyElements);

module.exports = router;

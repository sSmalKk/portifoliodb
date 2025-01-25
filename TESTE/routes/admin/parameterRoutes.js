/**
 * parameterRoutes.js
 * @description :: CRUD API routes for parameter
 */

const express = require('express');
const router = express.Router();
const parameterController = require('../../controller/admin/parameterController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/parameter/create').post(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.addParameter);
router.route('/admin/parameter/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.bulkInsertParameter);
router.route('/admin/parameter/list').post(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.findAllParameter);
router.route('/admin/parameter/count').post(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.getParameterCount);
router.route('/admin/parameter/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.getParameter);
router.route('/admin/parameter/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.updateParameter);    
router.route('/admin/parameter/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.partialUpdateParameter);
router.route('/admin/parameter/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.bulkUpdateParameter);
router.route('/admin/parameter/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.softDeleteParameter);
router.route('/admin/parameter/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.softDeleteManyParameter);
router.route('/admin/parameter/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.deleteParameter);
router.route('/admin/parameter/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,parameterController.deleteManyParameter);

module.exports = router;

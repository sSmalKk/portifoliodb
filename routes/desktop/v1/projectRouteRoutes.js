/**
 * projectRouteRoutes.js
 * @description :: CRUD API routes for projectRoute
 */

const express = require('express');
const router = express.Router();
const projectRouteController = require('../../../controller/desktop/v1/projectRouteController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/desktop/api/v1/projectroute/create').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.addProjectRoute);
router.route('/desktop/api/v1/projectroute/addBulk').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.bulkInsertProjectRoute);
router.route('/desktop/api/v1/projectroute/list').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.findAllProjectRoute);
router.route('/desktop/api/v1/projectroute/count').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.getProjectRouteCount);
router.route('/desktop/api/v1/projectroute/updateBulk').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.bulkUpdateProjectRoute);
router.route('/desktop/api/v1/projectroute/softDeleteMany').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.softDeleteManyProjectRoute);
router.route('/desktop/api/v1/projectroute/deleteMany').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.deleteManyProjectRoute);
router.route('/desktop/api/v1/projectroute/softDelete/:id').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.softDeleteProjectRoute);
router.route('/desktop/api/v1/projectroute/partial-update/:id').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.partialUpdateProjectRoute);
router.route('/desktop/api/v1/projectroute/update/:id').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.updateProjectRoute);    
router.route('/desktop/api/v1/projectroute/:id').get(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.getProjectRoute);
router.route('/desktop/api/v1/projectroute/delete/:id').delete(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,projectRouteController.deleteProjectRoute);

module.exports = router;

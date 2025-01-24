/**
 * userRoleRoutes.js
 * @description :: CRUD API routes for userRole
 */

const express = require('express');
const router = express.Router();
const userRoleController = require('../../../controller/desktop/v1/userRoleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/desktop/api/v1/userrole/create').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.addUserRole);
router.route('/desktop/api/v1/userrole/addBulk').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.bulkInsertUserRole);
router.route('/desktop/api/v1/userrole/list').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.findAllUserRole);
router.route('/desktop/api/v1/userrole/count').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.getUserRoleCount);
router.route('/desktop/api/v1/userrole/updateBulk').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.bulkUpdateUserRole);
router.route('/desktop/api/v1/userrole/softDeleteMany').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.softDeleteManyUserRole);
router.route('/desktop/api/v1/userrole/deleteMany').post(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.deleteManyUserRole);
router.route('/desktop/api/v1/userrole/softDelete/:id').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.softDeleteUserRole);
router.route('/desktop/api/v1/userrole/partial-update/:id').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.partialUpdateUserRole);
router.route('/desktop/api/v1/userrole/update/:id').put(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.updateUserRole);    
router.route('/desktop/api/v1/userrole/:id').get(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.getUserRole);
router.route('/desktop/api/v1/userrole/delete/:id').delete(auth(PLATFORM.DESKTOP),checkRolePermission,checkRolePermission,checkRolePermission,userRoleController.deleteUserRole);

module.exports = router;

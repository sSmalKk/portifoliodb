/**
 * UserRoutes.js
 * @description :: CRUD API routes for User
 */

const express = require('express');
const router = express.Router();
const UserController = require('../../controller/admin/UserController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/user/me').get(auth(PLATFORM.ADMIN),UserController.getLoggedInUserInfo);
router.route('/admin/user/create').post(auth(PLATFORM.ADMIN),checkRolePermission,UserController.addUser);
router.route('/admin/user/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,UserController.bulkInsertUser);
router.route('/admin/user/list').post(auth(PLATFORM.ADMIN),checkRolePermission,UserController.findAllUser);
router.route('/admin/user/count').post(auth(PLATFORM.ADMIN),checkRolePermission,UserController.getUserCount);
router.route('/admin/user/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,UserController.getUser);
router.route('/admin/user/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,UserController.updateUser);    
router.route('/admin/user/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,UserController.partialUpdateUser);
router.route('/admin/user/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,UserController.bulkUpdateUser);
router.route('/admin/user/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,UserController.softDeleteUser);
router.route('/admin/user/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,UserController.softDeleteManyUser);
router.route('/admin/user/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,UserController.deleteUser);
router.route('/admin/user/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,UserController.deleteManyUser);
router.route('/admin/user/change-password').put(auth(PLATFORM.ADMIN),UserController.changePassword);
router.route('/admin/user/update-profile').put(auth(PLATFORM.ADMIN),UserController.updateProfile);

module.exports = router;

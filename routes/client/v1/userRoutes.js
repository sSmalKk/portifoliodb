/**
 * UserRoutes.js
 * @description :: CRUD API routes for User
 */

const express = require('express');
const router = express.Router();
const UserController = require('../../../controller/client/v1/UserController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/user/me').get(auth(PLATFORM.CLIENT),UserController.getLoggedInUserInfo);
router.route('/client/api/v1/user/change-password').put(auth(PLATFORM.CLIENT),UserController.changePassword);
router.route('/client/api/v1/user/update-profile').put(auth(PLATFORM.CLIENT),UserController.updateProfile);
router.route('/sync').post(UserController.syncWithServer);

module.exports = router;

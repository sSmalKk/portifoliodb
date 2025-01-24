/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../../controller/desktop/v1/userController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/user/me').get(auth(PLATFORM.DESKTOP),userController.getLoggedInUserInfo);
router.route('/desktop/api/v1/user/change-password').put(auth(PLATFORM.DESKTOP),userController.changePassword);
router.route('/desktop/api/v1/user/update-profile').put(auth(PLATFORM.DESKTOP),userController.updateProfile);

module.exports = router;

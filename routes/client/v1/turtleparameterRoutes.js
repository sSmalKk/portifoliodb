/**
 * turtleparameterRoutes.js
 * @description :: CRUD API routes for turtleparameter
 */

const express = require('express');
const router = express.Router();
const turtleparameterController = require('../../../controller/client/v1/turtleparameterController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/turtleparameter/list').post(auth(PLATFORM.CLIENT),checkRolePermission,turtleparameterController.findAllTurtleparameter);
router.route('/client/api/v1/turtleparameter/count').post(auth(PLATFORM.CLIENT),checkRolePermission,turtleparameterController.getTurtleparameterCount);
router.route('/client/api/v1/turtleparameter/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,turtleparameterController.getTurtleparameter);

module.exports = router;

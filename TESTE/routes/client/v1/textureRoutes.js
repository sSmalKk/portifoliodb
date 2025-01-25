/**
 * textureRoutes.js
 * @description :: CRUD API routes for texture
 */

const express = require('express');
const router = express.Router();
const textureController = require('../../../controller/client/v1/textureController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/texture/list').post(auth(PLATFORM.CLIENT),checkRolePermission,textureController.findAllTexture);
router.route('/client/api/v1/texture/count').post(auth(PLATFORM.CLIENT),checkRolePermission,textureController.getTextureCount);
router.route('/client/api/v1/texture/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,textureController.getTexture);

module.exports = router;

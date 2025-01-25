/**
 * textureRoutes.js
 * @description :: CRUD API routes for texture
 */

const express = require('express');
const router = express.Router();
const textureController = require('../../controller/admin/textureController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/texture/create').post(auth(PLATFORM.ADMIN),checkRolePermission,textureController.addTexture);
router.route('/admin/texture/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,textureController.bulkInsertTexture);
router.route('/admin/texture/list').post(auth(PLATFORM.ADMIN),checkRolePermission,textureController.findAllTexture);
router.route('/admin/texture/count').post(auth(PLATFORM.ADMIN),checkRolePermission,textureController.getTextureCount);
router.route('/admin/texture/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,textureController.getTexture);
router.route('/admin/texture/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,textureController.updateTexture);    
router.route('/admin/texture/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,textureController.partialUpdateTexture);
router.route('/admin/texture/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,textureController.bulkUpdateTexture);
router.route('/admin/texture/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,textureController.softDeleteTexture);
router.route('/admin/texture/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,textureController.softDeleteManyTexture);
router.route('/admin/texture/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,textureController.deleteTexture);
router.route('/admin/texture/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,textureController.deleteManyTexture);

module.exports = router;

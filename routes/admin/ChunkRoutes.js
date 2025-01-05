/**
 * ChunkRoutes.js
 * @description :: CRUD API routes for Chunk
 */

const express = require('express');
const router = express.Router();
const ChunkController = require('../../controller/admin/ChunkController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/chunk/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.addChunk);
router.route('/admin/chunk/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.bulkInsertChunk);
router.route('/admin/chunk/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.findAllChunk);
router.route('/admin/chunk/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.getChunkCount);
router.route('/admin/chunk/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.getChunk);
router.route('/admin/chunk/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.updateChunk);    
router.route('/admin/chunk/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.partialUpdateChunk);
router.route('/admin/chunk/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.bulkUpdateChunk);
router.route('/admin/chunk/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.softDeleteChunk);
router.route('/admin/chunk/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.softDeleteManyChunk);
router.route('/admin/chunk/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.deleteChunk);
router.route('/admin/chunk/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ChunkController.deleteManyChunk);

module.exports = router;

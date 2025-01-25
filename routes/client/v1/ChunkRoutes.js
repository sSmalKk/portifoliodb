/**
 * ChunkRoutes.js
 * @description :: CRUD API routes for Chunk
 */

const express = require('express');
const router = express.Router();
const ChunkController = require('../../../controller/client/v1/ChunkController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/chunk/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ChunkController.findAllChunk);
router.route('/client/api/v1/chunk/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ChunkController.getChunkCount);
router.route('/client/api/v1/chunk/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ChunkController.getChunk);
router.route('/action').post(ChunkController.wordInteraction);
router.route('/getchunks').get(ChunkController.getchunks);

module.exports = router;

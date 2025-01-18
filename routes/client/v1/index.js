/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./cubesarrayRoutes'));
router.use(require('./serverRoutes'));
router.use(require('./sizeRoutes'));
router.use(require('./entityRoutes'));
router.use(require('./tickRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./CommentRoutes'));
router.use(require('./BlogRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;

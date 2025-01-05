/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./partRoutes'));
router.use(require('./custommodelRoutes'));
router.use(require('./packRoutes'));
router.use(require('./substanceRoutes'));
router.use(require('./turtleparameterRoutes'));
router.use(require('./modelRoutes'));
router.use(require('./textureRoutes'));
router.use(require('./itemgeneratorRoutes'));
router.use(require('./entityRoutes'));
router.use(require('./sizeRoutes'));
router.use(require('./interfaceRoutes'));
router.use(require('./assetsRoutes'));
router.use(require('./itemRoutes'));
router.use(require('./elementsRoutes'));
router.use(require('./parameterRoutes'));
router.use(require('./blockstateRoutes'));
router.use(require('./materialRoutes'));
router.use(require('./ChunkRoutes'));
router.use(require('./ChatRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./UserRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;

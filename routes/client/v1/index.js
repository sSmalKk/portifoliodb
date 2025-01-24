/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./TickupdateRoutes'));
router.use(require('./SizeRoutes'));
router.use(require('./packRoutes'));
router.use(require('./MaterialRoutes'));
router.use(require('./ChemistryElementRoutes'));
router.use(require('./entityRoutes'));
router.use(require('./EntityPartRoutes'));
router.use(require('./EntityBodyRoutes'));
router.use(require('./langRoutes'));
router.use(require('./CommentRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./BlogRoutes'));
router.use(require('./blockstateRoutes'));
router.use(require('./itemRoutes'));
router.use(require('./userRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;

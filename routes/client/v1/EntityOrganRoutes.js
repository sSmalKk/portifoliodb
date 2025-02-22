/**
 * EntityOrganRoutes.js
 * @description :: CRUD API routes for EntityOrgan
 */

const express = require('express');
const router = express.Router();
const EntityOrganController = require('../../../controller/client/v1/EntityOrganController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/EntityOrgan/create').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.addEntityOrgan);
router.route('/client/api/v1/EntityOrgan/list').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.findAllEntityOrgan);
router.route('/client/api/v1/EntityOrgan/count').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.getEntityOrganCount);
router.route('/client/api/v1/EntityOrgan/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.getEntityOrgan);
router.route('/client/api/v1/EntityOrgan/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.updateEntityOrgan);    
router.route('/client/api/v1/EntityOrgan/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.partialUpdateEntityOrgan);
router.route('/client/api/v1/EntityOrgan/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.softDeleteEntityOrgan);
router.route('/client/api/v1/EntityOrgan/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.softDeleteManyEntityOrgan);
router.route('/client/api/v1/EntityOrgan/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.bulkInsertEntityOrgan);
router.route('/client/api/v1/EntityOrgan/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.bulkUpdateEntityOrgan);
router.route('/client/api/v1/EntityOrgan/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.deleteEntityOrgan);
router.route('/client/api/v1/EntityOrgan/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,EntityOrganController.deleteManyEntityOrgan);

module.exports = router;

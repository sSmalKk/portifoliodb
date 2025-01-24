/**
 * EntityBodyRoutes.js
 * @description :: CRUD API routes for EntityBody
 */

const express = require('express');
const router = express.Router();
const EntityBodyController = require('../../../controller/desktop/v1/EntityBodyController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/entitybody/create').post(EntityBodyController.addEntityBody);
router.route('/desktop/api/v1/entitybody/list').post(EntityBodyController.findAllEntityBody);
router.route('/desktop/api/v1/entitybody/count').post(EntityBodyController.getEntityBodyCount);
router.route('/desktop/api/v1/entitybody/:id').get(EntityBodyController.getEntityBody);
router.route('/desktop/api/v1/entitybody/update/:id').put(EntityBodyController.updateEntityBody);    
router.route('/desktop/api/v1/entitybody/partial-update/:id').put(EntityBodyController.partialUpdateEntityBody);
router.route('/desktop/api/v1/entitybody/softDelete/:id').put(EntityBodyController.softDeleteEntityBody);
router.route('/desktop/api/v1/entitybody/softDeleteMany').put(EntityBodyController.softDeleteManyEntityBody);
router.route('/desktop/api/v1/entitybody/addBulk').post(EntityBodyController.bulkInsertEntityBody);
router.route('/desktop/api/v1/entitybody/updateBulk').put(EntityBodyController.bulkUpdateEntityBody);
router.route('/desktop/api/v1/entitybody/delete/:id').delete(EntityBodyController.deleteEntityBody);
router.route('/desktop/api/v1/entitybody/deleteMany').post(EntityBodyController.deleteManyEntityBody);

module.exports = router;

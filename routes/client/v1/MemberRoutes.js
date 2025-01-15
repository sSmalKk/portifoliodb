/**
 * MemberRoutes.js
 * @description :: CRUD API routes for Member
 */

const express = require('express');
const router = express.Router();
const MemberController = require('../../../controller/client/v1/MemberController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/member/create').post(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.addMember);
router.route('/client/api/v1/member/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.bulkInsertMember);
router.route('/client/api/v1/member/list').post(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.findAllMember);
router.route('/client/api/v1/member/count').post(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.getMemberCount);
router.route('/client/api/v1/member/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.getMember);
router.route('/client/api/v1/member/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.updateMember);    
router.route('/client/api/v1/member/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.partialUpdateMember);
router.route('/client/api/v1/member/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.bulkUpdateMember);
router.route('/client/api/v1/member/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.softDeleteMember);
router.route('/client/api/v1/member/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.softDeleteManyMember);
router.route('/client/api/v1/member/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.deleteMember);
router.route('/client/api/v1/member/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,MemberController.deleteManyMember);

module.exports = router;

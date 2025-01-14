/**
 * MemberRoutes.js
 * @description :: CRUD API routes for Member
 */

const express = require('express');
const router = express.Router();
const MemberController = require('../../controller/admin/MemberController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/member/create').post(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.addMember);
router.route('/admin/member/list').post(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.findAllMember);
router.route('/admin/member/count').post(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.getMemberCount);
router.route('/admin/member/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.getMember);
router.route('/admin/member/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.updateMember);    
router.route('/admin/member/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.partialUpdateMember);
router.route('/admin/member/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.softDeleteMember);
router.route('/admin/member/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.softDeleteManyMember);
router.route('/admin/member/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.bulkInsertMember);
router.route('/admin/member/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.bulkUpdateMember);
router.route('/admin/member/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.deleteMember);
router.route('/admin/member/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,MemberController.deleteManyMember);

module.exports = router;

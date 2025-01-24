/**
 * uploadRoutes.js
 * @description :: routes of upload/download attachment
 */

const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/desktop/v1/fileUploadController');

router.post('/desktop/api/v1/upload',fileUploadController.upload);

module.exports = router;
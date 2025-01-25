/**
 * uploadRoutes.js
 * @description :: routes of upload/download attachment
 */

const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/client/v1/fileUploadController');

router.post('/client/api/v1/upload', fileUploadController.upload);
router.get('/client/api/v1/files', fileUploadController.listFiles); // Rota para listar arquivos

module.exports = router;

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const previewController = require('../controllers/previewController');
const stitchController = require('../controllers/stitchController');
const downloadController = require('../controllers/downloadController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', homeController.homePage);
router.get('/preview', previewController.renderPreview);

router.post('/stitch', catchErrors(stitchController.stitchImages));

router.get('/download', downloadController.renderDownload);
router.post('/download', downloadController.downloadImage);

module.exports = router;

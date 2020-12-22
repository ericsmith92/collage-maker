const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const previewController = require('../controllers/previewController');
const stitchController = require('../controllers/stitchController');
const downloadController = require('../controllers/downloadController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', searchController.homePage);
router.get('/preview', previewController.renderPreview);

router.post('/stitch', catchErrors(stitchController.resizeAndWriteThumbnails), 
                       catchErrors(stitchController.stitchImages));

router.get('/download', downloadController.renderDownload);
router.post('/download', downloadController.downloadImage);

module.exports = router;

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const previewController = require('../controllers/previewController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', searchController.homePage);
router.get('/preview', previewController.renderPreview);

module.exports = router;

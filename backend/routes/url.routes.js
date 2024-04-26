const express = require('express')
const { handleGenerateNewShortURL, handleGetAnalytics, handleGetAllUrls } = require('../controllers/url.controller')
const router = express.Router()

router.post('/',handleGenerateNewShortURL)
    .get('/analytics/:shortId',handleGetAnalytics)
    .get('/list',handleGetAllUrls)

module.exports = router
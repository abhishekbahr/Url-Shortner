const shortid = require('shortid')
const URL = require('../models/url.model.js')

async function handleGetAllUrls(req,res) {
    try {
        const response = await URL.find({})
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function handleGenerateNewShortURL(req,res){
    const {url} = req.body
    if(!url){
        return res.status(400).json({error:"url is required"})
    }
    const shortID = shortid()

    await URL.create({
        shortId : shortID,
        redirectUrl : url,
        visitHistory : []
    })

    return res.json({id: shortID})
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetAllUrls,
}
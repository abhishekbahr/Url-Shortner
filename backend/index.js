const express = require('express')
const cors = require('cors')

require('dotenv').config()
const { connectToMongoDB } = require('./connect.js')
const URL = require('./models/url.model.js')
const urlRoute = require('./routes/url.routes.js')
const userRoute = require('./routes/user.routes.js')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

//connect to database
connectToMongoDB(process.env.MONGODB_URL)
    .then(() => {
        console.log("mongodb connected")
    })

app.use('/url',urlRoute)
app.use('/user',userRoute)

app.get('/:shortId',async (req,res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {   
            shortId,
        },
        {
            $push:{
                visitHistory: {
                    timestamp : Date.now()
                }
            }
        }
    )
    res.redirect(entry.redirectUrl)
})

app.listen(PORT,()=>{
    console.log(`Server started running successfully on ${PORT}`)
})
const express = require('express')
const cors = require('cors')
const cookesParser = require('cookie-parser')
const {restrictToLoggedinUserOnly} = require('./middleware/auth.middleware.js')

require('dotenv').config()
const { connectToMongoDB } = require('./connect.js')
const URL = require('./models/url.model.js')
const urlRoute = require('./routes/url.routes.js')
const userRoute = require('./routes/user.routes.js')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//connect to database
connectToMongoDB(process.env.MONGODB_URL)
    .then(() => {
        console.log("mongodb connected")
    })

app.use('/url',restrictToLoggedinUserOnly,urlRoute)
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
const jwt  = require('jsonwebtoken')

async function restrictToLoggedinUserOnly(req,res,next){
    // const userUid = res.cookies?.userUid
    // if(!userUid){
    //     return res.status(400).json(" Missing There is no such UId")
    // }
    // const user = getUser(userUid)
    // if(!user) {
    //     return res.status(400).json("User does not exists with the UId")
    // }
    // req.user = user
    // next()

    
    try {
        const {token} = req.cookies
        if(!token){
            res.status(403).json("Please login first")
        }
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decodeToken)
        req.user = decodeToken
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json("Invalid Token")
    }

    
}
module.exports = {
    restrictToLoggedinUserOnly
}
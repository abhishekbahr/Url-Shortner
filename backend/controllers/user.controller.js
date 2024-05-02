const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/user.model")

const {v4:uuidv4} = require('uuid')

async function handleUserSignup(req,res) {
    try {
        const {name, email, password} = req.body
        if(!(name && email && password)){
            return res.status(400).json('All fields are compulsory')
        }
        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(400).json('User already exists')
        }
        const encyptedPassword = await bcrypt.hash(password,10)
    
        const user = await User.create({
            name,
            email,
            password: encyptedPassword
        })
    
        const token = jwt.sign(
            {id : user._id,email},
            process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        )
    
        user.token = token
        user.password = undefined
    
        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
    }
}

async function handleUserLogin(req,res) {
    // const { email, password} = req.body
    // const user = await User.findOne({email,password}).select('-password')
    // if(!user){
    //     return res.status(400).json("Invalid Username or Password")
    // }
    // const sessionId = uuidv4()
    // setUser(sessionId,user)
    
    // //todo : cookie is not showing in the webpage
    // return res.cookie('uid',sessionId).status(200).json({id:user._id,name:user.name,email:user.email})

    try {
        const {email,password} = req.body
        if(!(email && password)){
            res.status(400).json('All field are compulsory')
        }
        const user = await User.findOne({email})
        if(!user){ 
            res.status(400).json("User does not exists!")
        }
        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET,
                {
                    expiresIn: '2h'
                }
            )
            user.token = token
            user.password = undefined
            //Cookie section 
            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : false,
            }

            res.status(200).cookie('token',token,options).json({
                success: true,
                token,
                user
            })
        }else{
            res.status(400).json("Password doesn't match")
        }
    } catch (error) {
        console.log(error)
    }
}
//TODO : Make a logout handler and make the cookies undefined

module.exports = {
    handleUserSignup,
    handleUserLogin
}
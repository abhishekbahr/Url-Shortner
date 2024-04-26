const User = require("../models/user.model")

async function handleUserSignup(req,res) {
    const {name, email, password} = req.body
    await User.create({
        name,
        email,
        password
    })
    return res.status(200).json("User Created Successfully")
}

async function handleUserLogin(req,res) {
    const { email, password} = req.body
    const user = await User.findOne({email,password}).select('-password')
    if(!user){
        return res.status(400).json("Invalid Username or Password")
    }
    return res.status(200).json({id:user._id,name:user.name,email:user.email})
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}
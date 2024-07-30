const User = require("../models/user")
const transporter = require("../middleware/transporter")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.Signup = async(req,res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashPassword
        })

        await user.save()

        return res.status(201).json({mesg: "User created succesfully", user})
    } catch (error) {
        return res.status(500).json({mesg: "Internal server Error"})
    }
}

exports.login = async(req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({mesg: "User not found with this email"})
        }

        const matchPass = await bcrypt.compare(password, user.password)
        if(!matchPass){
            return res.status(401).json({mesg: "Inavlid credentials"})
        }

        const token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"})

        res.status(200).json({mesg: "user login successfully", token})

    } catch (error) {
        res.status(500).json({mesg: "Internal server error"})
    }
}

exports.userUpdate = async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, data, {new: true})
        if(!user){
            return res.status(401).json({mesg: "user not found with this id"})
        }
        res.status(200).json({mesg: "user update successfully", user})

    } catch (error) {
        return res.status(500).json({mesg: "Internal server error", err: error.message})
    }

}

exports.deleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(401).json({mesg: "user not found"})
        }

        res.status(200).json({mesg: "user deleted successfully", user})
    } catch (error) {
        return res.status(500).json({mesg: "Internal server error", err: error.messgae})
    }
}

exports.resetPasswordEmail = async (req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({mesg: "user not found with this email"})
        }

        const token = jwt.sign({userId: user._id, email: user.email},process.env.JWT_SECRET, {expiresIn: "1h"} )

        const url = `${process.env.FRONTEND_URL}/reset/password/${token}`

        const mailOption = {
            from : process.env.HOST_EMAIL,
            to: email,
            subject: "Reset Password",
            html: `<div>This is a reset password email <br> ${url}</div>`
        }

        await transporter.sendMail(mailOption)

        res.status(200).json({mesg: "Email send successfully"})
    } catch (error) {
        return res.status(500).json({mesg: "Internal server error", err: error.message})
    }
}

exports.resetPassword = async(req,res) => {
    const {token} = req.params;
    const {password} = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10)

        const {userId} = await jwt.verify(token, process.env.JWT_SECRET);
console.log(userId)

    
        const user = await User.findByIdAndUpdate(userId, {password: hashPassword}, {new: true});
        if(!user){
            return res.status(401).json({mesg: "user not found"})
        }

        res.status(200).json({mesg: "password reset successfully"})
    } catch (error) {
        return res.status(500).json({mesg: "Internal server error", err: error.message})
    }
}
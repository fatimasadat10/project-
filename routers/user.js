const express = require("express")
const { Signup, login, userUpdate, deleteUser, resetPasswordEmail, resetPassword } = require("../controllers/user")
const router = express.Router()

router.post("/signup", Signup)
router.post("/login", login)
router.put("/update/user/:id", userUpdate)
router.delete("/delete/user/:id",  deleteUser)
router.post("/email/send", resetPasswordEmail)
router.put("/reset/password/:token", resetPassword)

module.exports = router



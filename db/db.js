const mongoose = require("mongoose")

const db = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connect")
    } catch (error) {
        console.log(error)
    }
}

module.exports = db
require('dotenv').config()
const express=require ("express")
const app=express()
const port = process.env.PORT || 3500
const db = require("./db/db")
const userRoutes = require("./routers/user")
const productRoutes = require('./routers/product')

app.use(express.json())


app.use("/api/v1", userRoutes)
app.use("/api/v1",productRoutes)


db()


app.listen(port,()=>{
    console.log(`server is running ${port}`);
})



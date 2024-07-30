const express=require('express')
const { productInfo, productUpdate, productDelete } = require('../controllers/product')
const productRoutes=express.Router()

productRoutes.post("/productInfo/:id",productInfo)
productRoutes.put("/productUpdate/:id",productUpdate)
productRoutes.delete("/productDelete/:id",productDelete)





module.exports=productRoutes
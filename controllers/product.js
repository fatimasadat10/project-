const Product = require("../models/Product")
const User = require("../models/user")


exports.productInfo=async(req,res)=>{
    const {id} = req.params
    const{productName,productOwner,description,price,quantity}=req.body
    const existUser = await User.findById(id)
    if(!existUser){
        res.status(404).json({success:false,message:"user not found"})
    }
    try {
        const product=new Product({
            productName,
            productOwner,
            description,
            price,
            quantity,
            createdby:existUser._id

        })
        await product.save()
        console.log(product)
        existUser.products.push(product._id)
        existUser.save()
       
        res.status(200).json({mesg:"product in saved successfully"})
        
    } catch (error) {
        res.status(505).json({mesg:"internal server error",err:error.message})
    }
}

exports.productUpdate= async(req,res)=>{
    const{id}=req.params
    const info=req.body

    try {
        const updation= await Product.findByIdAndUpdate(id,info,{new:true})
        if(!updation){
            res.status(404).json({mesg:"product not found"})
        }
        res.status(200).json({mesg:"product update successfully"})
        
    } catch (error) {
        res.status(505).json({mesg:"internal server error",err:error.message})
        
    }

}

exports.productDelete=async(req,res)=>{
    const{id}=req.params
    try {
        const deletion= await Product.findByIdAndDelete(id)
        if(!deletion){
            res.status(404).json({mesg:"id not found"})
        }
        res.status(200).json({mesg:"product info removed successfully"})
    } catch (error) {
        res.status(505).json({mesg:"internal server error",err:error.message})
    }
}
const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    productName:{
        type:"String",
        required:"true"
    },
    productOwner:{
        type:"string",
        required:"true"
    },
    description:{
        type:"string",
        required:"true"
    },
    price:{
        type:String,
        requird:"true"
    },
quantity:{
    type:String,
    required:"true"
},
createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}

})
const Product = mongoose.model("product",productSchema)
module.exports= Product
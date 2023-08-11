const mongooes = require('mongoose');
const {Schema,model} = mongooes;

const productSchema = new Schema({

    name:{type:String, required:[true,'Name Required'],unique:[true,"Unique name Required"]},
    price:{type:Number, required:[true,'Price Required']},
    color:{type:String, required:[true,'Color Required']},
    category:{type:String, required:[true,'Category Required']}, 
    description:{type:String, required:[true,'Description Required']}, 
    brand:{type:String, required:[true,'Brand Required']}, 
    sizes: [{
        size: { type: String, required: [true, 'Size Required'] },
        quantity: { type: Number, required: [true, 'Quantity Required'] }
      }],
      images:{type:Array,required:[true,'Image Required'] ,unique:[true,"Unique Image required"]}, 
      enable:{ type: Boolean, default: true },
      type:{ type: String, default: "Shoes" },

})

const product= new model('product',productSchema);
module.exports=product;
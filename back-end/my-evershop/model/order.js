const mongoose =require('mongoose');
const {Schema,model}=mongoose;

const orderSchema = new Schema({

    user_id:{type: mongoose.Schema.Types.ObjectId},
    user_email:{type:String,required:true},
    orderNumber:{type:Number,required:true},
    products:{type:Array, require:true},
    paymentMethod:{type:String, require:true},
    totalAmount:{type:Number,required:true},
    orderStatus:{type:String,required:true, default:'Pending'},
    
},{ timestamps: true }
);

const Order= new model("Order",orderSchema);

module.exports = Order;
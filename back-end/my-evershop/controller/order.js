const  mongoose  = require("mongoose");
const Order = require("../model/order");

const SaveOrder = async(req,res)=>{
    const orders = req.body;


    
    try {
        const newOrder = new Order(orders);
        const savedOrder = await newOrder.save();
        res.json({message:"Order created successfully",savedOrder}) 
        
    } catch (error) {
        res.status(500).json({message:"error creating order",error})
        console.log(error);
    }

}

const GetOrderData = async(req,res)=>{
    try {
        const orderData = await Order.find();
        res.json(orderData);
        
    } catch (error) {
        console.log(error);
        res.json({message:"Error getting order data",error})
    }
}

const GetOrderDataByUserId = async(req,res)=>{
    
    // console.log(req.body);
    const userId = new mongoose.Types.ObjectId(req.body.userId);
    // console.log(userId);
    // return;
    try {

        const response =await Order.find({user_id:userId});

        res.json(response);
        
    } catch (error) {
        res.json({message:"error getting user order data",error})
        console.log(error);
    }

}


const FullfillOrder = async(req,res)=>{
    const ObjectId = mongoose.Types.ObjectId;    
    const order_Ids=req.body;
    if(!order_Ids){
        console.log("ids are required");
        res.json({message:"ids are required"});
        return;
    }
    const orderIds = order_Ids.map(ids => new ObjectId(ids))

    try {
        const response =await Order.updateMany(
            {_id:{$in:orderIds}},
            {$set:{orderStatus:"Fullfilled"}}
        )

        res.json({message:"successfuly fulfilled the orders",response})
        
    } catch (error) {
        res.json({message:"error ouccer while fulfilling the orders",error})
        console.log(error);
        
    }
}



module.exports = {SaveOrder,GetOrderData,FullfillOrder,GetOrderDataByUserId};
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const secretKey = "shh";
 
const createUser = async (req,res)=>{
    const userData = req.body;
    const {name,email,password} = userData;
    const saltRound = 10
    const existedEmail = await User.findOne({email,email});

    try {

        if(existedEmail){
            res.status(409).json({message:"Email already exsisted"})
            return;
        }

        if(!userData){
            return res.status(400).json({ error: "User data is required" });
        }else{

            const token1 = jwt.sign({name:name,email:email},secretKey);

            const bycryptPassword = await bcrypt.hash(password,saltRound);

            const newUser = new User({
                name,
                email,
                password:bycryptPassword,
                token:token1,
            });
            const savedUser = await newUser.save();
            res.status(201);
    
            const token=jwt.sign({_id:newUser._id,name:newUser.name,email:newUser.email},secretKey)
            res.cookie('token', token, {
                httpOnly: true,
                secure: true, // Set this to true if using HTTPS
                // other cookie options like expires, maxAge, etc.
              });

            res.json({message:"New user created successfully!", token});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const loginUser = async(req,res)=>{

    const {email,password} = req.body;
    const user =  await User.findOne({email:email});
 
    console.log("user",user);

    try {
        //return if user does not exist
        if(!user){
           return res.status(400).json({message:"Invalid email or password"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        //return if password is not valid
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"})
         }
         if(user.enable == false){
            return res.json({message:"User is disable",status:user.enable})
        }
         const userData = {_id:user._id,name:user.name,email:user.email}
         console.log("userData----",userData);
         const token = jwt.sign(userData,'shh')

         // Set the token as an HttpOnly secure cookie
         res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now()+(3600*1000)) ,
            secure: true, // Set this to true if using HTTPS
            // other cookie options like expires, maxAge, etc.
          });

         res.json({message:"Login successful!", token});


         const decoded = jwt.verify(token, secretKey);
         console.log("userData after decoding ----",decoded);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
    

}

const protectedData = (req,res)=>{
    try {
        const user = req.user;
        res.status(200).json({success:true , data:'This is protected data', user})    
        
    } catch (error) {
        res.status(500).json(error)
    }


};


const logout = (req,res)=>{
    res.clearCookie("token");

    // Return a success response
    res.json({ message: "Logout successful" });
    
}

const allUser = async(req,res)=>{

    try {
        const data = await User.find();
        res.status(200).json(data);        
    } catch (error) {
        res.json({message:"error getting data",error})
        console.log(error);
    }

}

const addEnable = async(req,res)=>{
    try {
        
        const response = await User.updateMany(
            {},
            {$set:{enable:true}}
        );

        res.json(response);
        
    } catch (error) {
        res.json({message:'error addind enable',error});
        console.log(error);
    }
}

const enableUser = async(req,res)=>{
    const ObjectId = mongoose.Types.ObjectId;
    const userIds =  req.body.map(id=> new ObjectId(id));

    try {
        const response =await User.updateMany(
            {_id:{$in:userIds}},
            {$set:{enable:true}}

        )
        res.json({message:'succefully enable the user',modifiedCount:response.modifiedCount})

    } catch (error) {
        res.json({message:"error enabling user",error})
        console.log(error);
    }
}


const disableUser = async(req,res)=>{
    const ObjectId = mongoose.Types.ObjectId;
    // console.log(req.body);
    // return;
    const userIds =  req.body.map(id=> new ObjectId(id));

    try {
        const response =await User.updateMany(
            {_id:{$in:userIds}},
            {$set:{enable:false}}
        )

        res.json({message:'succefully disable the user',response})

    } catch (error) {
        res.json({message:"error disabling user",error})
        console.log(error);
    }
}



module.exports = {createUser,loginUser,enableUser,disableUser,protectedData,logout,addEnable,secretKey,allUser};
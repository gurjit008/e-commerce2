const {createUser,loginUser,protectedData,secretKey, logout, allUser, addEnable, enableUser, disableUser} = require('../controller/user')
const express = require ("express");
const cors = require("cors");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
//new thing cookies
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express()
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:3000", // Replace with the domain you want to allow
    credentials: true, // Enable sending cookies in cross-origin requests
};
app.use(cors(corsOptions));


const auth = (req,res,next)=>{
    // if(req.cookies.token == undefined){
    //     return res.status(401).json({message:'token not found or unuthorized'})

    // }
    const token = req.cookies.token;
        console.log("auth token--",token);
    if(!token){
        console.log("23 error");
        return res.status(401).json({message:'token not found or unuthorized'})
    }


    try {
        const decoded = jwt.verify(token,secretKey);
        req.user=decoded;
        // console.log("auth decoded",decoded);
        next();        
    } catch (error) {
        console.log('auth error--',error);
        return res.status(403).json({message:'error--',error}); //forbidden (invalid token)
    }
}

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/AllUser');
console.log("Databse Connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.post('/createUser',createUser);
app.post('/loginUser',loginUser);
app.get('/protectedData',auth,protectedData);
app.get('/logout',logout);
app.get('/allUser',allUser);
app.patch('/addEnable',addEnable);

app.patch('/enableUser',enableUser)
app.patch('/disableUser',disableUser)





app.listen(port,()=>{console.log(`Server started at ${port}`);})
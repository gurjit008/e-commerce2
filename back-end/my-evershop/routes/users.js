const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const {createUser,loginUser,protectedData,secretKey, logout, allUser, addEnable, enableUser, disableUser} = require('../controller/user')

const auth = (req,res,next)=>{
 
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



// Define user-related routes
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.get('/protectedData', auth, protectedData);
router.get('/logout', logout);
router.get('/allUser', allUser);
router.patch('/addEnable', addEnable);
router.patch('/enableUser', enableUser);
router.patch('/disableUser', disableUser);

module.exports = router;

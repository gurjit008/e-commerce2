const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors());

cloudinary.config({
  cloud_name: 'dkkqzmr4l',
  api_key: '889237693464645',
  api_secret: 'QGRB7701Jo_r1gvqBXvrvpu_QrU',
});

main().catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/cloudinary');
  console.log("Databse Connected");
}
const upload = multer({dest:"uploads/"});

app.post("/image", upload.array("image",5),async(req,res)=>{
    // const image = req.file.path;




// Define a schema for storing image URLs in MongoDB
const ImageSchema = new mongoose.Schema({
    url: {type: Array, required: true},
  });
  
  // Create a model based on the schema
  const Image = mongoose.model('Image', ImageSchema);



try {


  const imageUrls = [];

  for (const file of req.files) {
    // Upload each file to Cloudinary and collect the URLs
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "test",
    });
    imageUrls.push(result.secure_url);
    console.log("Uploaded image result: "+JSON.stringify(result.secure_url));

  }
    // const result = await cloudinary.uploader.upload(image,{
    //     folder:"test"
    // });
    // console.log("Uploaded image result: "+JSON.stringify(result));
    const newImage = new Image({
        url:imageUrls
    
    })
    
    console.log("new image instance: ",newImage);
    // console.log("url: ",result.secure_url);
    
    await newImage.save();

    res.send("Product saved successfully");
} catch (error) {
    console.log("Erron saving image: "+error);
    res.send("Error saving product");
}

});


app.listen(8000,()=>{console.log("Server started again");})
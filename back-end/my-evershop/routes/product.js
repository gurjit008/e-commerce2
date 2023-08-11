const express = require('express')
const app = express();
const {newProduct,allProducts,upload,findCategory, updateCategory, addKeyValue, addNewSizeAndQuantity, deleteProducts, enableProduct, disableProduct, searchQuery, addingType} = require('../controller/product')
const port = 8001;
const mongoose = require('mongoose');
const cors = require('cors');
const {GetOrderData,SaveOrder, FullfillOrder, GetOrderDataByUserId} = require('../controller/order');

app.use(cors());
app.use(express.json());


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/AllProduct');
console.log("Databse Connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.post('/newProduct',upload.array('images', 5), newProduct);
app.get('/AllProduct',allProducts);
app.get('/findCategory/:category',findCategory);
app.patch('/deleteProducts',deleteProducts);
app.patch('/enableProducts',enableProduct);
app.patch('/disableProducts',disableProduct);

app.post("/saveOrder",SaveOrder);
app.get("/getOrderData",GetOrderData);
app.post("/getOrderDataByUserId",GetOrderDataByUserId);
app.patch("/fullfillOrder",FullfillOrder);

app.put('/addNewPair',addKeyValue);// enable:true
app.patch('/addType',addingType);// enable:true
app.put('/updatecategory',updateCategory)
app.put('/newSize',addNewSizeAndQuantity)//adding new size and quantity

app.get("/search",searchQuery);

app.listen(port,()=>{console.log(`Server Started At ${port}`)})
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const userRoutes = require('./routes/userRoutes'); // Import userRoutes
// const productRoutes = require('./routes/productRoutes'); // Import productRoutes
const userRoutes =require('../routes/users') 
const productRoutes =require('../routes/products') 
const orderRoutes =require('../routes/orders') 
// const port = 8000;
const port = process.env.PORT || 8001;
require("dotenv").config();

app.use(cors({
  origin: ["https://myevershop.onrender.com","https://myevershop.vercel.app"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Database Connected");
}

// Use userRoutes as middleware for "/users" base path
app.use('/users', userRoutes);

// Use productRoutes as middleware for "/products" base path
app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

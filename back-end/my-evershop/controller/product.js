const product = require("../model/product");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: "dkkqzmr4l",
  api_key: "889237693464645",
  api_secret: "QGRB7701Jo_r1gvqBXvrvpu_QrU",
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads'); // You need to create an 'uploads' folder in your project root
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   });
//   const upload = multer({ storage: storage });

const newProduct = async (req, res) => {
  try {
    const prd = req.body;
    console.log("Product");

    if (!prd) {
      return res.send("Product details must be entered 1");
    }

    const { name, price, category, description, brand, color, sizes } = prd;

    if (
      !name ||
      !price ||
      !category ||
      !description ||
      !brand ||
      !color ||
      !sizes
    ) {
      return res.send("All product details must be provided 2");
    }

    const imageUrls = [];
    // Convert the sizes string back to an array
    console.log("sizes: " + typeof sizes);
    const parsedSizes = JSON.parse(sizes);
    console.log("parsed" + parsedSizes);

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "product_images",
      });
      imageUrls.push(result.secure_url);
      console.log(
        "Uploaded image result: " + JSON.stringify(result.secure_url)
      );
    }
    console.log(imageUrls);

    const newProduct = new product({
      name,
      price,
      category,
      description,
      images: imageUrls,
      brand,
      sizes: parsedSizes,
      color,
    });

    const savedProduct = await newProduct.save();
    res.json("New product has been saved" + savedProduct);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const allProducts = async (req, res) => {
  try {
    const Products = await product.find();

    if (!Products) {
      return res.json("There is no product");
    } else {
      res.json(Products);
    }
  } catch (error) {
    console.log(error);
  }
};

const findBrand = async (req, res) => {
  try {
    const brand = req.params.brand;
    const Products = await product.find({ brand: brand });

    if (!Products) {
      return res.json("There is no product");
    } else {
      res.json(Products);
      console.log(Products);
    }
  } catch (error) {
    console.log(error);
  }
};

const findCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const Products = await product.find({ category: category, enable: true });

    if (!Products) {
      return res.json("There is no product");
    } else {
      res.json(Products);
      // res.send(Products);
      // console.log(Products);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await product.updateMany(
      { category: "KIDS" },
      { $set: { category: "Kids" } }
    );

    res.json({ updatedCount: result.nModified }); // result.nModified will contain the number of documents that were updated
  } catch (error) {
    console.log(error);
  }
};

const addKeyValue = async (req, res) => {
  try {
    const result = await product.updateMany(
      // The filter criteria (you can adjust this according to your needs)
      {},

      // The update operation using the $set operator to add the new key-value pair
      { $set: { enable: true } }
    );

    res.json({ updatedCount: result.nModified }); // result.nModified will contain the number of documents that were updated
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding key-value pair to documents." });
    console.log(error);
  }
};

//adding new object in array sizes using $push:
const addNewSizeAndQuantity = async (req, res) => {
  const newSize = {
    size: "L", // Replace with the new size value
    quantity: 20, // Replace with the new quantity value
  };

  try {
    const response = await product.updateMany(
      {},
      { $push: { sizes: newSize } }
    );
    res.json({ updatedCount: response.nModified });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteProducts = async (req, res) => {
  const { SizeIds, ProductIds } = req.body;
  // console.log(Ids);
  console.log(SizeIds);
  console.log(ProductIds);

  const ObjectId = mongoose.Types.ObjectId;
  const sizeIds = SizeIds.map((id) => new ObjectId(id));
  const productIds = ProductIds.map((id) => new ObjectId(id));

  console.log(sizeIds);
  console.log(productIds);
  try {
    const response = await product.updateMany(
      { _id: { $in: productIds } },
      { $pull: { sizes: { _id: { $in: sizeIds } } } }
    );

    console.log(`Deleted ${response.nModified} sizes from multiple products`);
    res.json({
      message: `Deleted ${response.nModified} sizes from multiple products`,
    });
  } catch (error) {
    console.error("Error deleting sizes:", error);
    res.status(500).json({ message: "Error deleting sizes", error });
  }
};

const enableProduct = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const productIds = req.body.map((id) => new ObjectId(id));
  try {
    const response = await product.updateMany(
      { _id: { $in: productIds } },
      { $set: { enable: true } }
    );
    res.json({
      message: "Product Successfuly enabled",
      modified: response.modifiedCount,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Product Successfuly enabled", error });
  }
};

const disableProduct = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  console.log(req.body);
  // return;
  const productIds = req.body.map((id) => new ObjectId(id));
  try {
    const response = await product.updateMany(
      { _id: { $in: productIds } },
      { $set: { enable: false } }
    );
    res.json({
      message: "Product Successfuly disabled",
      modified: response.modifiedCount,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Product Successfuly disabled", error });
  }
};


const searchQuery = async(req,res)=>{
  const {q}=req.query;
  try {
    const searchQuery = q;
    const tokens = searchQuery.split(" ");

    const orConditions = tokens.map((token) => ({
      $or: [
        { name: { $regex: token, $options: "i" } },
        { category: { $regex: `\\b${token}\\b`, $options: "i" } },
        { brand: { $regex: `\\b${token}\\b`, $options: "i" } },
        { color: { $regex:`\\b${token}\\b`, $options: "i" } },
        { type: { $regex: token , $options: "i" } },
      
      ],
    }));
    
    const query = { $and: orConditions };
    

const results = await product.find(query);//.limit(10);
    

    res.json(results);
    
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Error searching products' });
    
  }
}



const addingType = async (req, res) => {
  try {
    const result = await product.updateMany(
      // The filter criteria (you can adjust this according to your needs)
      {},

      // The update operation using the $set operator to add the new key-value pair
      { $set: { type: "Shoes" } }
    );

    res.json({ updatedCount: result.nModified }); // result.nModified will contain the number of documents that were updated
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding key-value pair to documents." });
    console.log(error);
  }
};

module.exports = {
  newProduct,
  allProducts,
  findCategory,
  disableProduct,
  updateCategory,
  addKeyValue,
  addNewSizeAndQuantity,
  deleteProducts,
  enableProduct,
  searchQuery,addingType,
  upload,
};

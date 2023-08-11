const express = require('express');
const router = express.Router();
const { newProduct, allProducts, upload, findCategory, updateCategory, addKeyValue, addNewSizeAndQuantity, deleteProducts, enableProduct, disableProduct, searchQuery, addingType } = require('../controller/product');

// Define product-related routes
router.post('/newProduct', upload.array('images', 5), newProduct);
router.get('/AllProduct', allProducts);
router.get('/findCategory/:category', findCategory);
router.patch('/deleteProducts', deleteProducts);
router.patch('/enableProducts', enableProduct);
router.patch('/disableProducts', disableProduct);
router.get('/search', searchQuery);

router.put('/addNewPair', addKeyValue);
router.patch('/addType', addingType);
router.put('/updatecategory', updateCategory);
router.put('/newSize', addNewSizeAndQuantity);

module.exports = router;

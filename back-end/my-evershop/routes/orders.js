const express = require('express');
const router = express.Router();
const {GetOrderData,SaveOrder, FullfillOrder, GetOrderDataByUserId} = require('../controller/order');

router.post('/saveOrder', SaveOrder);
router.get('/getOrderData', GetOrderData);
router.post('/getOrderDataByUserId', GetOrderDataByUserId);
router.patch('/fullfillOrder', FullfillOrder);


module.exports = router;
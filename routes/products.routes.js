const express=require('express');
const productsController = require('../controllers/products.controller');


const router=express.Router(); //creates router object

router.get('/products',productsController.getAllProducts);

router.get('/products/:id',productsController.getProductDetails);

module.exports=router;
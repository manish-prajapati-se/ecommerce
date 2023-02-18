const express=require('express');

const adminController=require('../controllers/admin.controller');
const imageUploadMiddleware=require('../middlewares/image-upload');

const router=express.Router(); //creates router object

router.get('/products',adminController.getProducts)        //handles /admin/products

router.get('/products/new',adminController.getNewProduct);

router.post('/products',imageUploadMiddleware,adminController.createNewProduct);

module.exports=router;
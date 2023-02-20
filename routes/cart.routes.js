const express=require('express');

const cartController=require('../controllers/cart.controller');

const router=express.Router(); //creates router object

router.get('/',cartController.getCart);
//router.get(path,middleware)
router.post('/items',cartController.addCartItem);

router.patch('/items',cartController.updateCartItem);

module.exports=router;
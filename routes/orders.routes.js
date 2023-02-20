const express=require('express');

const ordersController=require('../controllers/orders.controller');

const router=express.Router(); //creates router object

router.post('/',ordersController.addOrder);

router.get('/',ordersController.getOrders);

module.exports=router;
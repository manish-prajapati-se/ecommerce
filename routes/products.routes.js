const express=require('express');


const router=express.Router(); //creates router object

router.get('/products',function(req,res){
    res.render('customer/products/all-products')
})

module.exports=router;
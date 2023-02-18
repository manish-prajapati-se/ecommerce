const express=require('express');


const router=express.Router(); //creates router object

router.get('/',function(req,res){
    res.redirect('/products');
})

module.exports=router;
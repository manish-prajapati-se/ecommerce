const express=require('express');

const authController=require('../controllers/auth.controller');

const router=express.Router(); //creates router object

//router.get(path,middleware)
router.get('/signup',authController.getSignup)

router.get('/login',authController.getLogin)

module.exports=router;
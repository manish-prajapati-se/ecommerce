const express=require('express');

const authController=require('../controllers/auth.controller');

const router=express.Router(); //creates router object

//router.get(path,middleware)
router.get('/signup',authController.getSignup)

router.post('/signup',authController.signup);

router.get('/login',authController.getLogin);

router.post('/login',authController.login);

router.post('/logout',authController.logout);

module.exports=router;
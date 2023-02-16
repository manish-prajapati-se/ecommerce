const User=require('../models/user.model');

function getSignup(req,res){
    //render will generate html page with the help of ejs
    //and send it to the visitor in response
    res.render('customer/auth/signup');
}

async function signup(req,res){
    const user=new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.street,
        req.body.city
    );

    await user.signup()
    
    res.redirect('/login');
}

function getLogin(req,res){
    res.render('customer/auth/login');
}

module.exports={
    getSignup:getSignup,
    getLogin:getLogin,
    signup:signup
}
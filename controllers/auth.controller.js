function getSignup(req,res){
    //render will generate html page with the help of ejs
    //and send it to the visitor in response
    res.render('customer/auth/signup');
}

function getLogin(req,res){

}

module.exports={
    getSignup:getSignup,
    getLogin:getLogin
}
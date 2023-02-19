function protectRoutes(req,res,next){
    if(!res.locals.isAuth){
        return res.redirect('/401');//not authenticated
    }

    if(req.path.startsWith('/admin') && !res.locals.isAdmin){
        return res.redirect('/403');//not authorized

    }

    next();
}

module.exports=protectRoutes;
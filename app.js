const express=require('express');
const path=require('path');
const csurf=require('csurf');
const expressSession=require('express-session');

const createSessionConfig=require('./config/session');
const db=require('./data/database');
const authRoutes=require('./routes/auth.routes');
const productRoutes=require('./routes/products.routes');
const baseRoutes=require('./routes/base.routes')
const adminRoutes=require('./routes/admin.routes');


const addCsrfTokenMiddleware=require('./middlewares/csrf-token');
const errorHandlerMiddleware=require('./middlewares/error-handler');
const checkAuthStatusMiddleware=require('./middlewares/check-auth');
const protectRoutesMiddleware=require('./middlewares/protect-routes');

const app=express();
app.set('view engine','ejs'); //tell express app to use ejs view engine
app.set('views',path.join(__dirname,'views')); //tell express where to find view

app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'));
app.use(express.urlencoded({extended:false})); 

const sessionConfig=createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csurf());   //generates the token
//all incoming requests which are not get requests needs to have a csrf token attached
app.use(addCsrfTokenMiddleware);    //distributes the generated token to route handler functions and views
app.use(checkAuthStatusMiddleware);

//register routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);

app.use(protectRoutesMiddleware);
app.use('/admin',adminRoutes);

app.use(errorHandlerMiddleware);//error handling middleware

db.connectToDatabase()
.then(function(){
   app.listen(3000);
})
.catch(function(error){
    console.log('failed to connect to the database');
    console.log(error);
});
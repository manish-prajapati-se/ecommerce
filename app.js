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
const cartRoutes=require('./routes/cart.routes');
const orderRoutes=require('./routes/orders.routes');

const addCsrfTokenMiddleware=require('./middlewares/csrf-token');
const errorHandlerMiddleware=require('./middlewares/error-handler');
const checkAuthStatusMiddleware=require('./middlewares/check-auth');
const protectRoutesMiddleware=require('./middlewares/protect-routes');
const cartMiddleware=require('./middlewares/cart');
const updateCartPricesMiddleware=require('./middlewares/update-cart-prices');
const notFoundMiddleware=require('./middlewares/not-found');

const app=express();
app.set('view engine','ejs'); //tell express app to use ejs view engine
app.set('views',path.join(__dirname,'views')); //tell express where to find view

app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'));
app.use(express.urlencoded({extended:false})); 
app.use(express.json()); //handles requests made by frontend javascript AJAX


const sessionConfig=createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csurf());   //generates the token
//all incoming requests which are not get requests needs to have a csrf token attached

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);
app.use(addCsrfTokenMiddleware);    //distributes the generated token to route handler functions and views
app.use(checkAuthStatusMiddleware);

//register routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use('/cart',cartRoutes);

app.use('/orders',protectRoutesMiddleware,orderRoutes);
app.use('/admin',protectRoutesMiddleware,adminRoutes);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);//error handling middleware

db.connectToDatabase()
.then(function(){
   app.listen(3000);
})
.catch(function(error){
    console.log('failed to connect to the database');
    console.log(error);
});
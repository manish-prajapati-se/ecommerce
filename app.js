const express=require('express');
const path=require('path');

const authRoutes=require('./routes/auth.routes');

const app=express();
app.set('view engine','ejs'); //tell express app to use ejs view engine
app.set('views',path.join(__dirname,'views')); //tell express where to find view


//register routes
app.use(authRoutes);

app.listen(3000);
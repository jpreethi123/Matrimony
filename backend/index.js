
const express=require('express');
const mysql=require('mysql2');
const bodyparser=require('body-parser');
const cors = require('cors');


const authRoutes=require('./routes/first');

const errorController=require('./controllers/error');

const app=express();
const ports=process.env.PORT||5000;
app.use(cors())

//app.use(bodyparser.json());
app.use(bodyparser.json({limit: '10mb', extended: true}))
app.use(bodyparser.urlencoded({limit: '10mb', extended: true}))
app.use((req,res,next)=>{
    // req.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Origin,Content-Type,Authorization');
    next();

});

app.use('/auth',authRoutes);

app.use(errorController.get404);
app.use(errorController.get500);


app.listen(ports,()=>console.log('server is running'));

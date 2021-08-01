const express = require('express');
const morgan = require('morgan');

const courseRouter = require('./routers/courseRouter');


const app = express();

///  middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req,res,next)=>{
    console.log('from middle ware');
    next();
});

app.use((req,res,next)=>{
    console.log('from  second middle ware');
    next();
});



///  routes

app.use('/courses',courseRouter);

module.exports = app;
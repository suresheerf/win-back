const express = require('express');
const path =require('path');
const morgan = require('morgan');
const rateLimit =require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require("compression")

const courseRouter = require('./routers/courseRouter');
const userRouter = require('./routers/userRouter');
const reviewRouter = require('./routers/reviewRouter');
const viewRouter = require('./routers/viewRouter');
const globalErrHandler = require('./controlers/errorController');
const appError = require('./utils/appError');


const app = express();
app.enable('trust proxy');
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


///  middleware

//static files 
app.use(express.static(path.join(__dirname,'public')));

//headers
app.use(helmet());

//development logging
if(process.env.NODE_ENV === 'development'){

    app.use(morgan('dev'));
}

///rate limiter
const limiter = rateLimit({
    max: 100,
    windowMs: 60*60*1000,
    message:'too many requests from this ip ,please try again after an hour.'
})
app.use('/',limiter);

//req.body parser

app.use(express.json({limit: '10kb'}));
app.use(cookieParser());

///sanitize data againt nosqel query attacks
app.use(mongoSanitize());

////sanitize data againt xss attacks
app.use(xss());

/////prevent parameter polution
app.use(hpp({
    whitelist:['duration']
}));

app.use(compression());
///  routes

app.use('/',viewRouter)

app.use('/api/courses',courseRouter);
app.use('/api/users',userRouter);
app.use('/api/reviews',reviewRouter);

app.all('*',(req,res,next)=>{
   
    next(new appError(`can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrHandler);

module.exports = app;
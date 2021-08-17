const appError = require('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new appError(message, 400);
  };

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
  
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new appError(message, 400);
  };

const handleJsonWebTokenError = ()=> new appError("invalid token! please login agin",401);

const handleJWTExpiredError = ()=> new appError("token expired! please login again",401);

const sendErrorDev = (err,req,res)=>{
    if(req.originalUrl.startsWith('/api')){
        res.status(err.statusCode).json({
            status : err.status,
            error: err,
            message : err.message,
            stack: err.stack
    
        });
    }
    else{
        res.status(err.statusCode).render('error',{
            title:'somthing went wrong',
            message:err.message
        })
    }
}

const sendErrorProd = (err,req,res)=>{
    if(req.originalUrl.startsWith('/api')){
        if(err.isOperational){
           return res.status(err.statusCode).render('error',{
            title:'somthing went wrong',
            message:err.message
           });
        }
            console.log("Error:",err); 
            return res.status(err.statusCode).render('error',{
                title:'somthing went wrong',
                message : 'Something went wrong,try again after some time.'
            });
    }
    if(err.isOperational){
        return res.status(err.statusCode).render('error',{
            title:'somthing went wrong',
            message: err.message
        });
        }
    console.log("Error:",err); 
    return res.status(err.statusCode).render('error',{
      title:'somthing went wrong',
      message: 'Something went wrong,try again after some time.'
        });
}

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === "development"){

        sendErrorDev(err,req,res);

    }else if(process.env.NODE_ENV === "production"){
        let error = { ...err };
           error.message = err.message;
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if(error.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
        if(error.name === 'JWTExpiredError') error = handleJWTExpiredError();
        sendErrorProd(error,req,res);
        
    }
    
}
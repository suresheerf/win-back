const crypto = require('crypto');
const { promisify } = require('util');
const User = require('./../models/user.model');
const appError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');

const signToken = id=>{
    return jwt.sign({id },process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_IN
})}

const createSendToken= (user,statusCode,req,res)=>{
    
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date( Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true,
        sercure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    }
    res.cookie('jwt',token,cookieOptions);

    user.password = undefined;
    res.status(statusCode).json({
        status:'success',
        token,
        user
    });
}

exports.signUp = catchAsync(async (req,res,next)=>{
        const nuser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        role:req.body.role
    });

    const url = `${req.protocol}://${req.get('host')}/user/me`;
    await new Email(nuser , url).sendWelcome();
    createSendToken(nuser,201,req,res);
});

exports.login = catchAsync( async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
       return next( new appError("please provide email and password",400))
    }

    const user = await User.findOne({email}).select('+password');

       
    if(!user || !(await user.correctPassword(password,user.password)))
    {
       return next(new appError('incorrect email or password',401));
    }

    createSendToken(user,200,req,res);
});

exports.logout = (req,res,next)=>{

        res.cookie('jwt','logout',{
            expires: new Date(Date.now()+10*1000),
            httpOnly: true
        });
    
        res.status(200).json({ status:'success'});
}

exports.protect = catchAsync (async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    token = req.headers.authorization.split(' ')[1];}
    else if(req.cookies.jwt)
    {
        token = req.cookies.jwt
    }
    if(!token){
        return next(new appError("you are not logged in! please login to get access",401));
    }

    const decode = await promisify(jwt.verify)(token , process.env.JWT_SECRET);
    
    const user = await User.findOne({"_id":decode.id});
 
    if(!user) return next(new appError('user has been deleted',400));

    if(user.changedPasswordAfter(decode.iat)) {
    return next(new appError('user recently changed password! please login again ',401));
    }
     
    req.user = user;
    res.locals.user = user;
    next();
});

exports.isLoggedIn = async (req,res,next)=>{

        if(req.cookies.jwt)
        {
            try{

                //verify cookie
                const decode = await promisify(jwt.verify)( req.cookies.jwt , process.env.JWT_SECRET);
                //find the user
                const currentUser = await User.findOne({"_id":decode.id});
                //check if user still exists
                if(!currentUser) return next();
                //check if password resently changed
                if(currentUser.changedPasswordAfter(decode.iat)) return next();   
        
                res.locals.user = currentUser;
                return next();
            }
            catch(err){
            return next()
             }
    }
    
    next();
}

exports.restrictTo = (roles)=>{
    return (req,res,next)=>{
        if(! (roles === req.user.role)) 
        {
            return next(new appError('your are not permitted to perform this action',403));
        }

        next();
    }
};

exports.forgetPassword = catchAsync( async (req,res,next) =>{
    const user = await User.findOne({email : req.body.email});

    if(!user) {
        return next(new appError('there is no user with this email',404));
    }

    const resetToken = user.createPasswordResetToken();

    await user.save({validateBeforeSave : false});

    const resetUrl = `${req.protocol}://${req.get('host')}/users/resetPassword/${resetToken}`
    try{
       
        await new Email(user,resetUrl).sendPasswordResetToken();

        res.status(200).json({
            status:'success',
            message:'password reset sent to email.'
        })
    }catch{
        
        user.passworsResetToken = undefined;
        user.resetTokenExpiresIn = undefined;

        await user.save({validateBeforeSave : false});

        return next(new appError('the was not sent,somthing went wrong.please try again later'),500);
    }

});

exports.resetPassword = catchAsync(async (req,res,next)=>{

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
                                                        
    const user = await User.findOne({
        passwordResetToken : hashedToken,
        resetTokenExpiresIn : {$gt : Date.now()}});


    if(!user) return next(new appError('Token is invalid or expired',400));

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.resetTokenExpiresIn = undefined;

    await user.save();

    createSendToken(user,200,req,res);   
});

exports.updatePassword = catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.user._id).select('+password');
    console.log(user)
    if(!await user.correctPassword(req.body.currentPassword , user.password)) {
    return next(new appError('entered old password is wrong,please try again',401));
    }
    user.password = req.body.newPassword;
    user.confirmPassword= req.body.confirmNewPassword;

    await user.save();
    createSendToken(nuser,200,req,res);
});

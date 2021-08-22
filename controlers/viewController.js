const catchAsync = require('./../utils/catchAsync');
const Course = require('./../models/course.model');
const User = require('./../models/user.model');
const appError = require('../utils/appError');

exports.getHome = catchAsync(async (req,res,next)=>{
    res.status(200).render('home',{title:"Home"})
});

exports.getCourses = catchAsync(async (req,res,next)=>{
    const courses = await Course.find();
    res.status(200).render('courses',{
        courses,
        title:"Courses"
    })
});

exports.getCourse = catchAsync(async (req,res,next)=>{
    const course = await Course.findOne({_id:req.params.id})

    if(!course) return next(new appError('there is no such course',404))

    res.status(200).render('course',{course,title:course.name});
});

exports.getUser = catchAsync(async (req,res,next)=>{
    const user = await User.findOne({_id:req.user._id})
 
    if(!user) return next(new appError('there is no such user',404))

    res.status(200).render('user');
});

exports.getLogin = catchAsync(async (req,res,next)=>{
    
    res.status(200).render('login',{title:"Login"})
});
exports.createCourse = catchAsync(async (req,res,next)=>{
    
    res.status(200).render('createCourse',{title:"Create Course"});
});

exports.getSignup = catchAsync(async (req,res,next)=>{
    
    res.status(200).render('signup',{title:"Signup"})
});
exports.getForgotPassword = catchAsync(async (req,res,next)=>{
    
    res.status(200).render('forgotPassword',{title:"Forgot Password"})
});
exports.getResetPassword = catchAsync(async (req,res,next)=>{
  res.status(200).render('resetPassword',{ title:"Reset Password" });
});

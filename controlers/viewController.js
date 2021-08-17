const catchAsync = require('./../utils/catchAsync');
const Course = require('./../models/course.model');
const User = require('./../models/user.model');
const appError = require('../utils/appError');

exports.getHome = catchAsync(async (req,res,next)=>{
    res.status(200).render('home')
});

exports.getCourses = catchAsync(async (req,res,next)=>{
    const courses = await Course.find();
    res.status(200).render('courses',{
        courses
    })
});

exports.getCourse = catchAsync(async (req,res,next)=>{
    const course = await Course.findOne({_id:req.params.id})

    if(!course) return next(new appError('there is no such course',404))

    res.status(200).render('course',{course});
});

exports.getUser = catchAsync(async (req,res,next)=>{
    const user = await User.findOne({_id:req.user._id})
 
    if(!user) return next(new appError('there is no such user',404))

    res.status(200).render('user');
});

exports.getLogin = catchAsync(async (req,res,next)=>{
    
    res.status(200).render('login')
});
exports.createCourse = catchAsync(async (req,res,next)=>{
    
    res.status(200).render('createCourse');
});

exports.getSignup = catchAsync(async (req,res,next)=>{
    
    res.status(200).render('signup')
});

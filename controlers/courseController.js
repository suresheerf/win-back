const { query } = require('express');
const course = require('./../models/course.model');
const appError = require('./../utils/appError');
const APIfeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');




exports.getCourses = catchAsync(async (req,res,next)=>{
    
       const features = new APIfeatures(course.find(),req.query).
       filter().
       sort().
       feildslimit().
       paginate();
       const courses = await features.query;

       res.status(200).json({
       status:'sucess',
       numberOFResults:courses.length,
       data:{
           courses
       }
    });
  
});

exports.getCourse =catchAsync( async (req,res,next)=>{
         console.log("inside get course");
         const cour = await course.findById(req.params.id);

         console.log('after get course');

         if(!cour){
             return next(new appError('not found any course with this ID',404));
         }
         res.status(200).json({
             status:'success',
             data:{
                 cour
             }
         });
});

exports.createCourse =catchAsync( async (req,res,next)=>{
        console.log('body:',req.body);
        const cou = await course.create(req.body);
        res.status(201).json({
            status:"success",
            data:{
                cou
            }
        }); 
});

exports.deleteCourse =catchAsync( async (req,res,next)=>{
       const course = await course.findByIdAndDelete(req.params.id);
       if(!course){
        return next(new appError('not found any course with this ID',404));
    }
        res.status(204).send('document deleted!');
});

exports.updateCourse =catchAsync( async (req,res,next)=>{

       const cour = await course.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
        });
        if(!cour){
            return next(new appError('not found any course with this ID',404));
        }
        res.status(200).json({
            status:"success",
            data:{
                cour
            }
        });
    } );

const { query } = require('express');
const Course = require('./../models/course.model');
const appError = require('./../utils/appError');
const APIfeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');
const { promises } = require('stream');


const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null , true);
    }
    else{
        cb(new appError('not an image.please upload an image.',400),false)
    }
}
const upload = multer({storage: multerStorage , fileFilter:multerFilter});

exports.uploadCourseImg = upload.fields([
    {name:'imageCover' , maxCount:1},
    {name:'images' , maxCount:3}
]);

exports.resizeCourseImg = catchAsync( async (req,res,next)=>{

    if(!req.files.imageCover || !req.files.images) next();

    req.body.imageCover =`user-${req.user.id}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
    .resize(2000,1333)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/img/courses/${req.body.imageCover}`)

    req.body.images = [];

    await promises.all(
        req.files.images.map(async (file,i)=>{
            const filename =`user-${req.user.id}-${Date.now()}-${i+1}.jpeg`;

            await sharp(file.buffer)
                  .resize(2000,1333)
                  .toFormat('jpeg')
                  .jpeg({quality:90})
                  .toFile(`public/img/courses/${filename}`)
                  req.body.images.push(filename);
                        }));
    next();
});

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
         const cour = await Course.findById(req.params.id);

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
        const cou = await Course.create(req.body);
        res.status(201).json({
            status:"success",
            data:{
                cou
            }
        }); 
});

exports.deleteCourse =catchAsync( async (req,res,next)=>{
       const course = await Course.findByIdAndDelete(req.params.id);
       if(!course){
        return next(new appError('not found any course with this ID',404));
    }
        res.status(204).send('document deleted!');
});

exports.updateCourse =catchAsync( async (req,res,next)=>{

       const cour = await Course.findByIdAndUpdate(req.params.id,req.body,{
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
exports.deleteLesson =catchAsync( async (req,res,next)=>{
       const course = await Course.updateOne({},
        {$pull:{
            "caricullum.$[].links":{_id:req.params.l}
       }},
     {
         new : true,
         
     });
       if(!course){
        return next(new appError('not found any course with this ID',404));
    }
    res.status(200).json({
        status:"success",
        
    });
});

exports.updatelesson =catchAsync( async (req,res,next)=>{
       const cour = await Course.updateOne({},
           {$push:{
               "caricullum.$[elem].links":{
                   name:req.body.name,
                   link:req.body.link
                                         }
                  }
          },
        {
            new : true,
            arrayFilters:[
                {
                    "elem._id":req.params.w
                }
            ]
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
exports.deleteWeek =catchAsync( async (req,res,next)=>{
       const course = await Course.updateOne({},
        {$pull:{
            "caricullum":{_id:req.body.id}
       }},
     {
         new : true,
         
     });
       if(!course){
        return next(new appError('not found any course with this ID',404));
    }
    res.status(200).json({
        status:"success",
        
    });
});

exports.updateWeek =catchAsync( async (req,res,next)=>{
       const cour = await Course.updateOne({_id:req.params.id},
           {$push:{
               "caricullum":{
                   week:req.body.week,
                   description:req.body.wdescrip
                                         }
                  }
          },
        {
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

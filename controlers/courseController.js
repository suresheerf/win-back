const Course = require('./../models/course.model');

exports.getCourses = async (req,res)=>{
    try{
   const courses = await Course.find({});

   res.status(200).json({
       status:'sucess',
       data:{
           courses
       }
   })

    } catch (err){
        console.log(err);
    }
}

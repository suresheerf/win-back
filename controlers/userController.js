const appError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/user.model');



const filterObj = (obj, ...allowed)=>{
    const newObj = {};
    Object.keys(obj).forEach(el=>{
        if(allowed.includes(el)) newObj[el] = obj[el]; 
        
    });
    return newObj
}
exports.updateMe = catchAsync(async (req,res)=>{
    
    if(req.body.password || req.body.confirmPassword){
        new appError('you can not change password here',401);
    }
    const filteredBody = filterObj(req.body,'name','email');
    const user = await User.findByIdAndUpdate(req.user._id, filteredBody,{
        new:true,
        runValidators: true
    });
    res.status(200).json({
        status:'success',
        message: "updated successfully"
    })
})

exports.deleteMe = catchAsync(async (req,res)=>{
    
       const user = await User.findById(req.user._id);
       user.active = false;
       await user.save();
    res.status(200).json({
        status:'success',
        message: "deleted successfully"
    })
})
exports.getUsers = catchAsync(async (req,res)=>{
   
   const users = await User.find();

   res.status(200).json({
       status:'sucess',
       data:{
           users
       }
   });

});

exports.getUser = async (req,res)=>{
    try{ 
         const user = await User.findById(req.params.id);
         res.status(200).json({
             status:'success',
             data:{
                 user
             }
         })
    } catch(err){
        res.status(404).json({
            status:"failed",
            message: err
        });
    }
}

exports.createUser = async (req,res)=>{
    try{
       const user = await User.create(req.body);
        res.status(201).json({
            status:"success",
            data:{
                user
            }
        })
    } 
    catch (err){
        res.status(404).json({
            status:"failed",
            message: err
        });
    }
}

exports.deleteUser = async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send('document deleted!');
    } 
    catch (err){
        res.status(404).json({
            status:"failed",
            message: err
        });
    }
}

exports.updateUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        });
    } 
    catch (err){
        res.status(404).json({
            status:"failed",
            message: err
        });
    }
}

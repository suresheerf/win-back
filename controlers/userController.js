const appError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const sharp = require('sharp');
const User = require('./../models/user.model');
const multer = require('multer');

// const multerStorage = diskStorage({
//     destination:(req , file , cb)=>{
//         cb(null , 'public/img/users');
//     },
//     filename:(req,file,cb)=>{
//         const ext = file.mimetype.split('/')[1];
//         cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)

//     }
// })

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

exports.uploadUserImg = upload.single('img');

exports.resizeUserImg =catchAsync( async (req,res,next)=>{
    if(!req.file) next();

    req.file.filename =`user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/img/users/${req.file.filename}`)
     
    next();
});

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

    if(req.file) filteredBody.img = req.file.filename;

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

const catchAsync = require('./../utils/catchAsync');
const Notification = require('./../models/notification.model');
const appError = require('./../utils/appError');

exports.getAll = catchAsync(async (req,res,next)=>{
    const notifications = await Notification.find();
    //if(!notifications) return next(new appError('there are no reviwes yet',403));
    res.locals.notifications = notifications;
    next();
})

exports.createNotification = catchAsync(async (req,res,next)=>{
    
    const notification = await Notification.create(req.body);
    res.status(200).json({
        status:'success',
        data:{
            notification
        }
    })
})

exports.deleteNotification = catchAsync(async (req,res,next)=>{
    
    const notification = await Notification.deleteOne({_id:req.body.id});
    res.status(200).json({
        status:'success',
        }
    )
})
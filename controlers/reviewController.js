const catchAsync = require('./../utils/catchAsync');
const Review = require('./../models/review.model');
const appError = require('./../utils/appError');


exports.getAllReviews = catchAsync(async (req,res,next)=>{
    const filter = {};
    if(req.params.courseId) filter = { course : req.params.courseId};
    const reviews = await Review.find(filter);
    if(!reviews) return next(new appError('there are no reviwes yet',403));
    console.log(reviews);
    res.status(200).json({
        status:'success',
        results:reviews.length,
        data:{
           reviews
        }
    })
    next();

})
exports.createReview = catchAsync(async (req,res,next)=>{
    if(!req.course) req.body.course = req.params.courseId;
    if(!req.body.user) req.body.user = req.user._id;
    
    const review = await Review.create(req.body
        // {
        // review:req.body.review,
        // rating:req.body.rating,
        // course:req.course._id,
        // user:req.user._id
        // }
    )
    res.status(200).json({
        status:'success',
        data:{
            review
        }
    })
    next();
});
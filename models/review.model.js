const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:[true,'review must not be empty']
    },
    rating:{
        type:Number,
        max:5,
        min:1
    },
    createdAt:{

        type:Date,
        default:Date.now
    },
    course:{
        type:mongoose.Schema.ObjectId,
        ref:'course',
        required:[true,'review must belong to a course']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'user',
        required:[true,'review must belong to a user']
    }
},
{
    toJSON:{virtuals : true},
    toObject:{virtuals : true}
});

reviewSchema.pre(/^find/,function (next){
    // this.populate({
    //     path:'course',
    //     select:'name'
    // }).populate({
    //     path:'user',
    //     select:'name'
    // })

    this.populate({
            path:'user',
             select:'name'
    })
    
    next();
})

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;
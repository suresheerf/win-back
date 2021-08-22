const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'course must have a name.'],
        unique:true
    },
    duration :Number,
    description :String,
    imageCover :String,
    images:Array,
    price :Number,
    caricullum:
        [
            {
                week:Number,
                description:String,
                total:Number,
                completed:Number,
                progress:Number,
                links: 
                    [
                        {
                            name:String,
                            link:String,
                            img:String,
                            watched:{
                                type:Boolean,
                                default:false
                            }
                            
                        }
                    ]
            }       
            
        ],
    tutors:[
        {
            type: mongoose.Schema.ObjectId,
            ref:'user'
        }
    ]
},
{
    toJSON:{virtuals : true},
    toObject:{virtuals : true}
});



courseSchema.virtual('reviews',{
    ref:'Review',
    foreignField:'course',
    localField: '_id'


});
courseSchema.pre(/^find/,function(next){
    this.populate({
        path:'tutors',
        select:'-__v -changedAt'
    })
    next();
})

const course = mongoose.model('course',courseSchema);

module.exports = course;


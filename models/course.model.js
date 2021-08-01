const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'course must have a name.']
    },
    duration:Number,
    description:String,
    img:String
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;


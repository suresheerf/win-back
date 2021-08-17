const mongoose = require('mongoose'),
      fs = require('fs');
const Course = require('./../models/course.model');

mongoose.
  connect('mongodb://localhost:27017/winrobot',{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useNewUrlParser: true
}).
then( ()=> console.log('DB connection success!') );

const courses = JSON.parse( fs.readFileSync(`${__dirname}/course_sample.json`,'utf-8'));

importData = async ()=>{
    try{
    await Course.create(courses);
    console.log('data successfully loaded!');
    } catch(err){
        console.log(err);
    }
   process.exit();
}

delateData = async ()=>{
    try{
    await Course.deleteMany();
    console.log('data successfully deleted!');
    }catch(err){
        console.log(err);
    }
   process.exit();
}

if(process.argv[2] === '_import'){
    importData();
}else if(process.argv[2] === '_delete'){
    delateData();
}

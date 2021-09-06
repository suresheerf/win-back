const mongoose = require('mongoose');
const fs = require('fs');
let Model;
let data;

      
mongoose.
connect('mongodb+srv://dbuser128:dbuser128@cluster0.6oanr.mongodb.net/natours-test?retryWrites=true&w=majority',{
    //   connect('mongodb://localhost:27017/winrobot',{
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useNewUrlParser: true
    }).
    then( ()=> console.log('DB connection success!') );
            
if(process.argv[3] === 'c'){
     Model = require('./../models/course.model');
     data = JSON.parse( fs.readFileSync(`${__dirname}/course_sample.json`,'utf-8'));
}
if(process.argv[3] === 'u'){
     Model = require('./../models/user.model');
     data = JSON.parse( fs.readFileSync(`${__dirname}/users_sample.json`,'utf-8'));
    
}
if(process.argv[3] === 'n'){
     Model = require('./../models/notification.model');
     data = JSON.parse( fs.readFileSync(`${__dirname}/note_sample.json`,'utf-8'));
}

importData = async ()=>{
    try{
        await Model.create(data);
    console.log('data successfully loaded!');
    } catch(err){
        console.log(err);
    }
   process.exit();
}

deleteData = async ()=>{
    try{
    await Model.deleteMany();
    console.log('data successfully deleted!');
    }catch(err){
        console.log(err);
    }
   process.exit();
}

if(process.argv[2] === '_import'){
    importData();
}else if(process.argv[2] === '_delete'){
    deleteData();
}

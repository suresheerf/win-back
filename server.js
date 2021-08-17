const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({path:"./config.env"});
const databse = 'mongodb+srv://admin:admin1234@cluster0.6oanr.mongodb.net/natours-test?retryWrites=true&w=majority'
mongoose.connect(databse,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true

}).then(() =>{
  console.log('DB connection successful');

app.listen(3000,()=>{
    console.log(` App running at port 3000`);
});
});

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({path:"./config.env"});
const port = process.env.PORT || 3000;
const databse = 'mongodb+srv://admin:admin1234@cluster0.6oanr.mongodb.net/natours-test?retryWrites=true&w=majority'
mongoose.connect(databse,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true

}).then(() =>{
  console.log('DB connection successful');

app.listen(port,()=>{
    console.log(` App running at port 3000`);
});
});

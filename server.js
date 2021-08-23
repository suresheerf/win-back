const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({path:"./config.env"});
const port = process.env.PORT || 3000;
// const databse = 'mongodb+srv://admin:admin1234@cluster0.6oanr.mongodb.net/natours-test?retryWrites=true&w=majority'
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true

}).then(() =>{
  console.log('DB connection successful');
});

const server = app.listen(port,()=>{
  console.log(` App running at port 3000`);
});

process.on('unhandledRejection',err=>{
  console.log('UNHANDLED REJECTION! shutting down...');
  console.log(err.name,err.message);
  server.close(()=>{
    process.exit(1);
  });
});

process.on('SIGTERM',()=>{
  console.log('SIGTERM recieved! shutting down');
  server.close(()=>{
    console.log('process terminated!');
  });
});

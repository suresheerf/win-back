const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({path:"./config.env"});
const port = process.env.PORT || 3000;
const database = process.env.NODE_ENV === 'poduction'?process.env.DATABASE:process.env.DATABASE_LOCAL;

mongoose.connect(database,{
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

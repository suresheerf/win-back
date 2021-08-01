const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');
dotenv.config({path:"./config.env"});

mongoose.connect(process.env.DATABASE_LOCAL,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true

}).then(con =>console.log(con.connections));

app.listen(3000,()=>{
    console.log(` App running at port 3000`);
});

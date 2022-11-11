const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// console.log();
// var DB1 = DB.useDb('project4'),
// console.log(DB);
// console.log(process.env);

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
  
  }).then(() =>{
    // console.log(con.connections);
    console.log('DB connection succesful');
  }).catch((err)=>{
    console.log(err);
  });
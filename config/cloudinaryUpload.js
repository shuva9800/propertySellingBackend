const cloudinary = require('cloudinary').v2;
require("dotenv").config();


const cloudbase = ()=>{
    try{
     cloudinary.config(
         {
             cloud_name: process.env.CLOUD_NAME,
             api_key: process.env.API_KEY,
             api_secret: process.env.API_SECRET
         }
     )
    
    }
    catch(error){
     console.log(error);
     console.log("somthing went wrong in connection with clouidnary")
 
    }
 }
 module.exports = cloudbase
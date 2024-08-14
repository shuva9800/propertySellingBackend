const jwt =require("jsonwebtoken")
require("dotenv").config()

exports.checkAuthentication = async (req,res,next)=>{
try{
    const token = req.body.token || req.cookies.loginToken;
    if(!token || token===undefined){
        return res.status(401).json({
            success: false,
            message:"token is missing or invalid"
        })
    }
    try{
        const decode = jwt.verify(token, process.env.jwt_secret);
        console.log(decode);
        req.user= decode;
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "error occure while decode token",
            error: err.message
        })
    }
    next();
}
catch(error){
    return res.status(401).json({
        success:false,
        message: " error while token checking for auhhentatication",
        error: error.message
    })
}
}

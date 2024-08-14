const express= require('express');
const app = express();
const {dbconnect} = require("./config/database");
const dotenv= require("dotenv");
const signupRouter = require('./routes/userrouter');
const cookieParser = require('cookie-parser');
const cloudinary = require('./config/cloudinaryUpload');
const fileUpload = require('express-fileupload');
const listingRouter = require('./routes/listing.route')
const cors = require('cors')


dotenv.config();
const PORT = process.env.PORT || 4000 ;
app.listen(PORT, ()=>{
    console.log(`app running  port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors())
//database connection
dbconnect();
//cloudinary connection
cloudinary();
app.use(fileUpload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
));


app.get("/", (req,res)=>{
    return res.status(200).json({
        success: true,
        message:" hello dashboard"
    })
})
///routing use
app.use('/api/v1',signupRouter)
app.use('/api/v1/listing',listingRouter)
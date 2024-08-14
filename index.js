const express= require('express');
const app = express();
const {dbconnect} = require("./config/database");
const dotenv= require("dotenv");
const signupRouter = require('./routes/userrouter');
const cookieParser = require('cookie-parser');
const listingRouter = require('./routes/listing.route')
const cors = require('cors')


dotenv.config();
const PORT = process.env.PORT || 4000 ;
app.listen(PORT, ()=>{
    console.log(`app running  port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', //  frontend URL
    credentials: true // Allow credentials (cookies)
}));

//database connection
dbconnect();
//cloudinary connection


app.get("/", (req,res)=>{
    return res.status(200).json({
        success: true,
        message:" hello dashboard"
    })
})
///routing use
app.use('/api/v1',signupRouter)
app.use('/api/v1/listing',listingRouter)
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

const allowedOrigins = [
    'https://mernstack-realestate.netlify.app', // Your frontend production URL
   // Ensure you add this if you're using branches
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies to be sent with requests
  };
  
  app.use(cors(corsOptions));

//database connection
dbconnect();


app.get("/", (req,res)=>{
    return res.status(200).json({
        success: true,
        message:" hello dashboard"
    })
})
///routing use
app.use('/api/v1',signupRouter)
app.use('/api/v1/listing',listingRouter)
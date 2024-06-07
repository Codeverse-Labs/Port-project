// this will find and all the .env  file in root folder
require('dotenv').config();

//express
const express = require('express');
const app = express();

//connect to db
const connectDB = require('./config/db');
connectDB();

const morgan = require("morgan");
app.use(morgan("dev")); // configire morgan

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here

//middleware
app.use(express.json());

//cors for handeling ports
const cors = require("cors");
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const billRoutes = require('./routes/billRoutes');
const dptRoutes  = require('./routes/dptRoutes');
const userMobileRoutes  = require('./routes/userMobileRoutes');
const telecomRoutes  = require('./routes/telecomRoutes');
const telebillRoutes  = require('./routes/telebillRoutes');

//routes
app.use('/users', userRoutes);
app.use('/bills', billRoutes);
app.use('/dpt', dptRoutes);
app.use('/usermobile', userMobileRoutes);
app.use('/telecom', telecomRoutes);
app.use('/telebills', telebillRoutes);

//set port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

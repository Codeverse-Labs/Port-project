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


//routes

//set port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
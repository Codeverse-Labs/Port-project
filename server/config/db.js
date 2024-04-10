const mysql = require('mysql');

//connect to database
 const connectDB = async() => {
     try {
         await mysql.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
         })
     } catch (error) {
         console.log('Database connection FAIL');
         console.log(error);
         process.exit(1);
     }
     console.log('Database connection SUCCESS');
}

module.exports = connectDB;

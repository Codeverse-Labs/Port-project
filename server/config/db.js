const mysql = require('mysql');

//connect to database
 const connectDB = async() => {
     try {
         await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'billmanagementsystem'
         })
     } catch (error) {
         console.log('Database connection FAIL');
         console.log(error);
         process.exit(1);
     }
     console.log('Database connection SUCCESS');
}

module.exports = connectDB;
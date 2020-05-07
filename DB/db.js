var mysql = require('mysql');
require('dotenv/config');

var con = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    timezone: "Macedonia/Skopje"
  });

con.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('DB CONNECTED!')
    }
});
module.exports = con;
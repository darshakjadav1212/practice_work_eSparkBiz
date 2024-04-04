const mysql = require('mysql');
const  dotenv = require('dotenv');
let result = dotenv.config();

const MYSQL_IP =  process.env.MYSQL_IP;
const MYSQL_LOGIN = process.env.MYSQL_LOGIN;
const MYSQL_PASSWORD =  process.env.MYSQL_PASSWORD;
const DB_NAME = process.env.DB_NAME;

let con = mysql.createConnection({
  multipleStatements :true,
    host:  MYSQL_IP,
    user: MYSQL_LOGIN,
    password: MYSQL_PASSWORD,
    database: DB_NAME
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connection with mysql established");
  });
  
  
module.exports=con;
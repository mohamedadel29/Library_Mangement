const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  database: 'library',
  password: ""
});
connection.connect((err)=>{
  if(err){
    console.error('error connect'+err.stack)
    return;
  }
  console.log('connected as id'+connection.threadId)
})

module.exports = connection
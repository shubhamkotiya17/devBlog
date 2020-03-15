const mysql = require('mysql');

const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database: "devBlog"
})

con.connect((err) => {
    if(err) throw err;
    console.log(`connected to database !!`);
})

module.exports = con;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../dbconnection');

// ############## note 
// ###### learn to use async await for apis *imp

router.get('/', (req, res) => {
    res.send('hello auth')
})

// signup user 
//api- auth/signup
router.post('/signup', (req, res) => {
    let encryptPassword = bcrypt.hashSync(req.body.password, 8); // encrypt pass 
    let insertQuery = `insert into users (firstName,lastName,email,password) values ('${req.body.fname}','${req.body.lname}', '${req.body.email}', '${encryptPassword}')` ; 

    db.query(insertQuery, (err, result) => {
        if(err) {
                res.json({
                    status : false,
                    message : `An Error Occured!!`,
                    query : insertQuery,
                    error : err
                })
        }else{
            res.json({
                status : true,
                message: `user inserted successfully!`,
                insertedId : result.insertId
            })
        }
    });
});

// login
// api- auth/login
router.post('/login', (req, res) => {
    let pwd = req.body.password;
    let selectQuery=`select password from users where email = '${req.body.email}'`;
    db.query(selectQuery, (err, result) => {
        if(err){
            res.json({
                status : false,
                message : "Error With Email Provided!",
                error : err
            });
        }else{
            // email exists
            if(result){
                let check = bcrypt.compare(pwd, result.password);
                if(check){
                    res.json({
                        status : true,
                        message : "Valid Login!"
                    });
                }else{
                    res.json({
                        status:false,
                        message : "Login Failed"
                    });
                }
            }
        }
    });
});


module.exports = router;
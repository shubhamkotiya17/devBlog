const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../dbconnection');
const jwt = require('jsonwebtoken');
const config = require('../config');
const jwt_middleware = require('../middlewares/jwt_middleware');

// ############## note 
// ###### learn to use async await for apis *imp

router.get('/', (req, res) => {
    res.send('hello auth')
})

// to generate a jwt token
function createToken(user){
    const token = jwt.sign({ id : user} , config.secret, {
        expiresIn : 300// 5 minutes 
    });
    return token ;
}

// signup user 
//api- auth/signup
router.post('/signup', (req, res) => {
    let encryptPassword = bcrypt.hashSync(req.body.password, 8); // encrypt pass 
    let insertQuery = `insert into users (firstName,lastName,email,password) values ('${req.body.fname}','${req.body.lname}', '${req.body.email}', '${encryptPassword}')` ; 
    let user = {
        fullName : req.body.fname+"_"+req.body.lname,
        email : req.body.email
    }
    db.query(insertQuery, (err, result) => {
        if(err) {
                res.json({
                    status : false,
                    message : `An Error Occured While Signup!!`,
                    error : err
                });
        }else{
            const token = createToken(user);
            res.json({
                status : true,
                message: `user inserted successfully!`,
                insertedId : result.insertId,
                token : token
            })
        }
    });
});

// login
// api- auth/login
router.post('/login' ,(req, res) => {
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
            if(result[0].password){
               bcrypt.compare(pwd, result[0].password, (err, result) =>{
                        if(err){
                            console.log('bcrypt error ', err);
                            res.send('error in bcrypt');
                        } else {
                            if(result){
                                // email & password matched !
                                const token = createToken();
                                res.json({
                                    status : true,
                                    message : "Login Success !",
                                    token : token
                                });
                            }else{
                                res.json({
                                    status:false,
                                    message : "Login Failed Wrong Credentials !"
                                });
                            }
                        }
                });
                
            }
        }
    });
});

// for testing purpose 
router.get('/getUsersTest', jwt_middleware.checkToken, (req, res)=>{
        db.query("select * from users", (err, result) => {
                if(err){
                    res.send('error in getUsers');
                }else {
                    res.send(result);
                }
        });
});

module.exports = router;
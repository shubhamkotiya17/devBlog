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
    let insertQuery = `insert into users (firstName,lastName,email,password) values ('${req.body.firstName}','${req.body.lastName}', '${req.body.email}', '${encryptPassword}')` ; 
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
                user_id : result.insertId,
                token : token
            })
        }
    });
});

// login
// api- auth/login
router.post('/login' ,(req, res) => {
    let pwd = req.body.password;
    let selectQuery=`select password , id as user_id from users where email = '${req.body.email}'`;

    db.query(selectQuery, (err, result) => {
        console.log('err ', err, " ", result)
        if(err){
            res.json({
                status : false,
                message : "Error Occured In Query !",
                error : err
            });
        }else{
            // email exists
            if(result.length>0 && result[0].password){
                // console.log('result * ', result, " ", result[0]['user_id'])

               bcrypt.compare(pwd, result[0].password, (err, result1) =>{
                        if(err){
                            console.log('bcrypt error ', err);
                            res.send('error in bcrypt');
                        } else {
                            if(result1){
                                // email & password matched !
                                const token = createToken();
                                res.json({
                                    status : true,
                                    message : "Login Success !",
                                    data :{ user_id : result[0]['user_id']},
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
                
            }else{
                res.json({
                    status:false,
                    message : "Login Failed Wrong Credentials !"
                });
            }
        }
    });
});

// for testing purpose jwt_middleware.checkToken
router.get('/getUsersTest', (req, res)=>{
        db.query("select * from users", (err, result) => {
                if(err){
                    res.send('error in getUsers');
                }else {
                    res.send(result);
                }
        });
});

module.exports = router;
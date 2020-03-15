const jwt = require('jsonwebtoken');
const config = require('../config');

let checkToken = (req, res, next) => {
    // jwt verify
    let token = req.headers['x-access-token'] || req.headers['authorization'] ;
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                res.json({
                    status : false,
                    message : `token is not valid !`
                })
            }else{
                req.decodedToken = decoded;
                next();
            }
        });
      }else {
        res.json({
            status : false,
            message : `No token present !`
        })
      }
}

module.exports = {
    checkToken : checkToken
}
const express = require('express');
const router = express.Router();
const blogService = require('../services/blogService');
const jwt_middleware = require('../middlewares/jwt_middleware');


// create blog
// api- createBlog by user_id , jwt_middleware.checkToken
router.post('/createBlog' ,(req, res) => {
    blogService.createBlog(req.body, (err, dataResponse) =>{
            if(err){
                res.json({
                    status : false,
                    response : dataResponse
                })
            }else{
                res.json({
                    status : true,
                    response : dataResponse
                })
            }
    });
    
});

module.exports = router;
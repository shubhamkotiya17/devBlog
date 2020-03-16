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
                    data : dataResponse
                })
            }
    });
    
});

// api - get blog by blog id
router.get('/getBlog/:blogid', (req, res) => {
    // console.log('req in get blog ++++ ', req.params.blogid)
    let body = {};
    body.id = req.params.blogid;
    // console.log('bodyyyyy ', body)
    blogService.getBlog(body, (err,  dataResponse) => {
        if(err){
            res.json({
                status : false,
                response : dataResponse
            })
        }else{
            res.json({
                status : true,
                data : dataResponse
            })
        }
    });
});

//api - getAllBlogs
router.get('/getAllBlogs/:userid', (req, res) => {
    let body = {};
    body.userid = req.params.userid;
    blogService.getAllBlogs(body, (err,  dataResponse) => {
        if(err){
            res.json({
                status : false,
                response : dataResponse
            })
        }else{
            res.json({
                status : true,
                data : dataResponse
            })
        }
    });
})
module.exports = router;
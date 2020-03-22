const express = require('express');
const router = express.Router();
const blogService = require('../services/blogService');
const jwt_middleware = require('../middlewares/jwt_middleware');


// create blog
// api- createBlog by user_id , jwt_middleware.checkToken
router.post('/createBlog' ,jwt_middleware.checkToken,(req, res) => {
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
router.get('/getBlog/:blogid',jwt_middleware.checkToken, (req, res) => {
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

//api - getAllBlogs for home except the user logged in
router.get('/getAllBlogs/:userid',jwt_middleware.checkToken, (req, res) => {
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

//api - getAllBlogs for profile for the logged in user
router.get('/getAllBlogsForProfile/:userid', jwt_middleware.checkToken, (req, res) => {
    let body = {};
    body.userid = req.params.userid;
    blogService.getAllBlogsForProfile(body, (err,  dataResponse) => {
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
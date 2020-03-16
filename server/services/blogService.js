const db = require('../dbconnection');
const jwt_middleware = require('../middlewares/jwt_middleware');

const blogService  = {
        createBlog : (body, callback) => {
            let user_id = body.id;
            
            let selectQuery = `insert into blog (user_id, title, content, created_on)
                                values (${user_id}, '${body.title}', '${body.content}', ${Date.now()})` ;

            db.query(selectQuery, (err, result) => {
                if(err){
                    callback(err, {data : null, errorMessage: err, message : "An error occured while creating blog !"});
                }else{
                    callback(null, {data: result ,errorMessage:null, message:"Blog Created Success !"})
                }
            });
        },
        getBlog : (body, callback) => {
            let selectQuery = `select id, title, content from blog where id = ${body.id}`;
            
            db.query(selectQuery, (err, result) => {
                if(err){
                    callback(err, {data : null, errorMessage: err, message : "An error occured while getting blog !"});
                }else{
                    callback(null, {data: result ,errorMessage:null, message:"Blog Fetched Success !"})
                }
            });
        },
        getAllBlogs : (body, callback) => {
            let selectQuery = `select * from blog where user_id != ${body.userid}`;
            db.query(selectQuery, (err, result) => {
                if(err){
                    callback(err, {data : null, errorMessage: err, message : "An error occured while getting all blog !"});
                }else{
                    if(result.length > 0)
                      callback(null, {data: result ,errorMessage:null, message:"All blog Fetched Success !"});
                    else
                      callback(null, {data: result ,errorMessage:null, message:"No Blog Exists !"});

                }
            });
        }
}

module.exports = blogService;
const db = require('../dbconnection');
const jwt_middleware = require('../middlewares/jwt_middleware');

const blogService  = {
        createBlog : (body, callback) => {
            let user_id = body.user_id;
            
            let selectQuery = `insert into blog (user_id, title, content, created_on)
                                values (${user_id}, '${body.title}', '${body.content}', ${Date.now()})` ;

            db.query(selectQuery, (err, result) => {
                if(err){
                    callback(err, {data : null, errorMessage: err, message : "An error occured while creating blog !"});
                }else{
                    callback(null, {data: result ,errorMessage:null, message:"Blog Created Success !"})
                }
            });
        }
}

module.exports = blogService;
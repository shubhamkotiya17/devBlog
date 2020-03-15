const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    secret : process.env.mysecret,
    port : process.env.port
}
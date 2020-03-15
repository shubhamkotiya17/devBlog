const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send('hello auth')
})

// signup user 
router.post('/signup', (req, res) => {
    let encryptPassword = bcrypt.hashSync(req.body.password, 8); // encrypt pass 
    

});


module.exports = router;
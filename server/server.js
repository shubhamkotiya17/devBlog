const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const config = require('./config');

app.use(cors());
app.use(bodyParser.json());
    
 app.listen(config.port, () => console.log(`Your port is ${config.port}`))

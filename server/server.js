const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const config = require('./config');
const auth = require('./api/auth');

app.use(cors());
app.use(bodyParser.json());

// ** authentication route ** //
app.use('/auth',auth);

app.listen(config.port, () => console.log(`Your port is ${config.port}`))

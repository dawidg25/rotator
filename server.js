const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

require('./db');

const UserController = require('./api/user/UserController');
const AuthController = require('./api/auth/AuthController');
const OtherController = require('./api/other/OtherController');

app.use('/api/user', UserController);
app.use('/api/auth', AuthController);
app.use('/api/other', OtherController);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
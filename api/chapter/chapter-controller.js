const express = require('express');
const bodyParser = require('body-parser');
const utility = require('../../lib/utility');
const authToken = require('../../lib/authToken');
const Chapter = require('./chapter');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

module.exports = router;
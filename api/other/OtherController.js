const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {exec} = require('child_process');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.get('/lastCommitId', (req, res, err) => {
    exec('git rev-parse --short HEAD', (error, stdout) => {
        res.status(200).json({data: stdout});
    })
})

module.exports = router;
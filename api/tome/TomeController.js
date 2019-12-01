const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const utility = require('../../lib/utility');
const authToken = require('../../lib/authToken');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const Tome = require('./Tome');

router.post('/', authToken, (req, res) => {
    Tome.create({
        title: req.body.title,
        url: req.body.url,
        createDate: Date.now()
    }).then(doc => {
        let ret = utility.apiDocumentCreated(doc);
        res.status(ret.status).json(ret);
    }).catch(err => {
        let ret = utility.apiErrorResponse(err);
        res.status(ret.status).json(ret);
    });
})
// router.delete('/', (req, res) => {
//     Tome.deleteMany({}).then( ok => {
//         res.status(200).json(ok);
//     })
// })

router.get('/', (req, res) => {
    Tome.find({}).then(doc => {
        let ret = {
            status: 200,
            document: doc
        };
        res.status(ret.status).json(ret);
    })
})
module.exports = router;
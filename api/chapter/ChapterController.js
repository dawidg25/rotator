const express = require('express');
const bodyParser = require('body-parser');
const utility = require('../../lib/utility');
const authToken = require('../../lib/authToken');
const Chapter = require('./Chapter');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', authToken, (req, res, err) => {
    Chapter.create({
        parentId: req.body.tome,
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
router.get('/', (req, res) => {
    Chapter.find({}).sort({createDate: 'desc'}).then(doc => {
        let ret = {
            status: 200,
            document: doc
        };
        res.status(ret.status).json(ret);
    })
})
// router.get('/:id', (req, res, err) => {
//     Chapter.find({})
// })
module.exports = router;
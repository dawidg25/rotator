const express = require('express');
const bodyParser = require('body-parser');
const utility = require('../../lib/utility');
const authToken = require('../../lib/authToken');
const Chapter = require('./Chapter');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    Chapter.find({}).sort({createDate: 'desc'}).then(doc => {
        let ret = {
            status: 200,
            document: doc
        };
        res.status(ret.status).json(ret);
    }).catch(err => {
        console.log(err);
    });
})

router.get('/all', (req, res) => {
    Chapter.find({}).populate('parentId').sort({createDate: 'desc'}).then(doc => {
        let ret = {
            status: 200,
            document: doc
        };
        res.status(ret.status).json(ret);
    }).catch(err => {
        console.log(err);
    });
})

router.get('/:id', (req, res) => {
    Chapter.findOne({_id: req.params.id}).then(doc => {
        let ret = {
            status: 200,
            document: doc
        };
        res.status(ret.status).json(ret);
    }).catch(err => {
        let ret = utility.apiErrorResponse(err);
        res.status(ret.status).json(ret);
    });
})

router.post('/', authToken, (req, res) => {
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
router.post('/:id', authToken, (req, res) => {
    Chapter.findOneAndUpdate({_id: req.params.id}, {
        parentId: req.body.tome,
        title: req.body.title,
        url: req.body.url,
        modifyDate: Date.now()
    }).then(doc => {
        let ret = utility.apiDocumentCreated(doc);
        res.status(ret.status).json(ret);
    }).catch(err => {
        let ret = utility.apiErrorResponse(err);
        res.status(ret.status).json(ret);
    })
})

router.delete('/:id', authToken, (req, res) => {
    Chapter.findOneAndDelete({_id: req.params.id}).then(doc => {
        let ret = utility.apiDocumentRemoved(doc);
        res.status(ret.status).json(ret);
    }).catch(err => {
        let ret = utility.apiErrorResponse(err);
        res.status(ret.status).json(ret);
    })
})

module.exports = router;
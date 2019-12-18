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

router.get('/', (req, res) => {
    Tome.find({}).sort({createDate: 'desc'}).then(doc => {
        let ret = {
            status: 200,
            document: doc
        };
        res.status(ret.status).json(ret);
    })
})

router.get('/:id', (req, res) => {
    Tome.findOne({_id: req.params.id}).then(doc => {
        let ret = {
            status: 200,
            document: doc
        };
        res.status(ret.status).json(ret);
    })
})

router.get('/active', (req, res) => {
    Tome.find({active: true}).then(doc => {
        let ret = {
            status: 200,
            document: doc
        };
        res.status(ret.status).json(ret);
    }).catch(queryError => {
        console.log(queryError);
    })
})

router.post('/:id', authToken, (req, res) => {
    Tome.findOneAndUpdate({_id: req.params.id}, {
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
    Tome.findOneAndDelete({_id: req.params.id}).then(doc => {
        let ret = utility.apiDocumentRemoved(doc);
        res.status(ret.status).json(ret);
    }).catch(err => {
        let ret = utility.apiErrorResponse(err);
        res.status(ret.status).json(ret);
    })
})
module.exports = router;
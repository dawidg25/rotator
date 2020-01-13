const express = require('express');
const bodyParser = require('body-parser');
const utility = require('../../lib/utility');
const authToken = require('../../lib/authToken');
const Chapter = require('./Chapter');
const multer = require('multer');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' +file.originalname)
    }
});
var upload = multer({storage: storage}).single('file');

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

router.post('/:id/upload', authToken, (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        var attachmentFile = {
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        }

        Chapter.findOne({_id: req.params.id}).then(doc => {
            doc.attachment.push(attachmentFile);
            doc.save();
            return res.status(200).send(req.file)
        }).catch(err => {
            return res.status(500).json(err)
        });
        
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
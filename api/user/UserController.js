const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const authToken = require('../../lib/authToken');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const User = require('./User');

//ADD NEW USER
router.post('/', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        type: req.body.type
    }, (err, user) => {
        let ret = {};
        if(err) {
            ret.status = 500;
            ret.errors = {};

            Object.keys(err.errors).forEach(key => {
                ret.errors[key] = err.errors[key].message;
            })
        } else {
            ret.status = 200;
            ret.user = user;
        }
        res.status(ret.status).json(ret);
    })
})

//GET ALL USERS
router.get('/', authToken, (req, res) => {
    User.find({}, (err, users) => {
        if(err) return res.status(500).send('There was a problem getting information from database');
        res.status(200).send(users);
    })
})

//GET A SINGLE USER
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) return res.status(500).send('There was a problem finding the user');
        if(!user) return res.status(404).send('No user found');
        res.status(200).send(req.params);
    })
})

//DELETE A SINGLE USER
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, user) => {
        if(err) return res.status(500).send('There was a problem deleting the user');
        res.status(200).send(`User ${user.name} was deleted`);
    })
})

//UPDATE A SINGLE USER
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if(err) return res.status(500).send('There was a problem upadting the user');
        res.status(200).send(user);
    })
})
module.exports = router;

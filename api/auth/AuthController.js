const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const User = require('../user/User');

//GET USER BY EMAIL
router.post('/', (req, res, next) => {
	User.findOne({email: req.body.email}, (err, user) => {
		let ret = {
			status: 404
		}

		if(err) {
			ret.status = 500;
			ret.errors = {};

			Object.keys(err.errors).forEach(key => {
				ret.errors[key] = err.errors[key].message;
			})
			return res.send(ret.status).json(ret);
		} 
		if(user) {
			const isEqual = bcrypt.compareSync(req.body.password, user.password);
			if(isEqual) {
				user.password = undefined;

				ret.status = 200;
				ret.token = jwt.sign({user}, process.env.PRIVATE_KEY, {expiresIn: '7d'});
				ret.user = JSON.stringify({id: user._id, name: user.name, email: user.email});
			}
		}
		res.status(ret.status).json(ret);	
	})
})

module.exports = router;


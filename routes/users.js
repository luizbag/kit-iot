var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var config = require('../config');
var check_token = require('./token');

router.post('/login', function(req, res, next) {
	User.findOne({"email": req.body.email}, function(err, user) {
		if(err) return next(err);
		if(user) {
			user.comparePassword(req.body.password, function(match) {
				if(match) {
					var u = {};
					u._id = user._id;
					u.email = user.email;
					var token = jwt.sign(u, config.secret, {noTimestamp: true});
					res.json(token);
				} else {
					console.log("Attempt failed to login with " + user.email);
					res.sendStatus(401);
				}
			});
		} else {
			res.sendStatus(401);
		}
	});
});

router.post('/register', function(req, res, next) {
	User.create(req.body, function(err, user) {
		if(err) {
			console.log(err);
			return next(err);
		}
		res.json(user);
	});
});

router.use(check_token);

router.get('/', function(req, res, next) {
	User.findById(req.user._id, function(err, user) {
		if(err) return next(err);
		users = [];
		users.push(user);
		res.json(users);
	});
});

router.put('/:id', function(req, res, next) {
	User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
		if(err) return next(err);
		res.json(user);
	});
});

module.exports = router;

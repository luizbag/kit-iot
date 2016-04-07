var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Sensor = require('../models/sensor.js');

router.get('/', function(req, res, next) {
	Sensor.find({'user': req.user._id}, function(err, sensores) {
		if(err) return next(err);
		res.json(sensores);
	});
});

router.get('/:id', function(req, res, next) {
	Sensor.findById(req.params.id, function(err, sensor) {
		if(err) return next(err);
		res.json(sensor);
	});
});

router.post('/', function(req, res, next) {
	var sensor = new Sensor(req.body);
	sensor.user = req.user._id;
	Sensor.create(sensor, function(err, sensor) {
		if(err) return next(err);
		res.json(sensor);
	});
});

router.put('/:id', function(req, res, next) {
	Sensor.findByIdAndUpdate(req.params.id, req.body, function(err, sensor) {
		if(err) return next(err);
		res.json(sensor);
	});
});

router.delete('/:id', function(req, res, next) {
	Sensor.findByIdAndRemove(req.params.id, req.body, function(err, sensor) {
		if(err) return next(err);
		res.json(sensor);
	});
});

router.post('/:id', function(req, res, next) {
	console.log(req.body);
	req.body.data_hora = new Date().getTime();
	Sensor.findByIdAndUpdate(req.params.id,
		{$push: {leituras: req.body}},
		{safe: true, upsert: true, new: true},
		function(err, sensor) {
			if(err) return next(err);
			console.log(sensor);
			res.json(sensor);
		});
});

module.exports = router;
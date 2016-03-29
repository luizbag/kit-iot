var express = require('express');
var router = express.Router();
var mongoAdapter = require('../db');

var collection = "sensores";

router.get("/", function(req, res, next) {
	mongoAdapter.findDocuments(collection, {}, function(err, docs) {
		res.render("sensores/index", {sensores: docs});
	});
});

router.get("/:id", function(req, res, next) {
	mongoAdapter.findDocument(collection, {id: req.params.id}, function(err, doc) {
		res.render("sensores/show", {sensor: doc});
	});
});

module.exports = router;
var express = require('express');
var router = express.Router();
var mongoAdapter = require('../db');

var collection = "sensores";

router.get("/", function(req, res, next) {
	mongoAdapter.findDocuments(collection, {}, function(err, docs) {
		res.render("sensores/index", {base: req.baseUrl, title: "Sensores", sensores: docs});
	});
});

router.get("/:id", function(req, res, next) {
	mongoAdapter.findDocument(collection, {id: req.params.id}, function(err, doc) {
		if(err) console.log(err);
		else res.render("sensores/show", {base: req.baseUrl, title: doc.nome, sensor: doc});
	});
});

router.post("/", function(req, res, next) {
	mongoAdapter.insertDocument(collection, req.body, function(err, result) {
		if(err) console.log(err);
		else res.json(result);
	});
});

router.post("/:id", function(req, res, next) {
	req.body.data_hora = new Date().getTime();
	mongoAdapter.findDocument(collection, {id: req.params.id}, function(err, doc) {
		if(err) console.log(err);
		else {
			if(!doc.leituras) {
				doc.leituras = [];
			}
			doc.leituras.push(req.body);
			mongoAdapter.updateDocument(collection, {id: req.params.id}, doc, function(err, results) {
				if(err) console.log(err);
				else res.json(results);
			});
		}
	});
});

module.exports = router;
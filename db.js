"use strict"
var MongoClient = require('mongodb').MongoClient;

var mongoAdapter = {};

mongoAdapter.connect = function(url, cb) {
	MongoClient.connect(url, function(err, db) {
		if(err) cb(err);
		else { 
			mongoAdapter.db = db;
			cb(undefined);
		}
	});
};

mongoAdapter.insertDocuments = function(col, documents, cb) {
	var collection = mongoAdapter.db.collection(col);
	collection.insertMany(documents, function(err, result) {
		if(err) cb(err);
		else cb(undefined, result);
	});
};


mongoAdapter.findDocuments = function(col, query, cb) {
	var collection = mongoAdapter.db.collection(col);
	collection.find(query).toArray(function(err, docs) {
		if(err) cb(err);
		else cb(undefined, docs);
	});
}

mongoAdapter.findDocument = function(col, query, cb) {
	var collection = mongoAdapter.db.collection(col);
	collection.findOne(query, function(err, doc) {
		if(err) cb(err);
		else cb(undefined, doc);
	});
}

module.exports = mongoAdapter;
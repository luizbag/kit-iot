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

mongoAdapter.insertDocument = function(col, document, cb) {
	var collection = mongoAdapter.db.collection(col);
	collection.insertOne(document, function(err, result) {
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

mongoAdapter.updateDocument = function(col, query, doc, cb) {
   mongoAdapter.db.collection(col).updateOne(query, doc, function(err, results) {
   		if(err) cb(err);
   		else cb(undefined, results);
   });
};

module.exports = mongoAdapter;
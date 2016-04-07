var mongoose = require('mongoose');

var SensorSchema = new mongoose.Schema({
	nome: { type: String, require: true },
	leituras: [mongoose.Schema.Types.Mixed],
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Sensor', SensorSchema);
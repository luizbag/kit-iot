module.exports = {
	'secret': process.env.SECRET || '1234567890',
	'database': process.env.MONGOLAB_URI || 'mongodb://localhost/kit-iot'
};
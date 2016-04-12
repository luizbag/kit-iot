var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var config = require('../config');

var UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  token: {type: String}
});

UserSchema.pre('save', function(next) {
  var user = this;
  var u = {};
  u._id = user._id;
  u.email = user.email;
  user.token = jwt.sign(u, config.secret, {noTimestamp: true});
  if(!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if(err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, match) {
    if(err) return cb(err);
    cb(match);
  });
};

module.exports = mongoose.model('User', UserSchema);
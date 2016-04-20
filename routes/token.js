var jwt = require('jsonwebtoken');
var config = require('../config');

var check_token = function(req, res, next) {
  var token = req.headers.authorization;
  if(token) {
   jwt.verify(token, config.secret, function(err, decoded) {
     if(err) {
      return res.sendStatus(401);
    } else {
      req.user = decoded;
      next();
    }
  });
 } else {
   return res.sendStatus(401);
 }
};

module.exports = check_token;

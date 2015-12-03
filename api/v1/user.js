var _            = require('lodash');
//var eventproxy   = require('eventproxy');
//var userProxy    = require('../../proxy').User;
/*
var create = function (req, res, next) {
  userProxy.newAndSave(req.body.name, req.body.loginName, req.body.pass, 
  req.body.email,req.body.accessToken, function (err, topic) {
    if (err) {
      return next(err);
    }
  });
};
*/
var show = function (req, res, next) {
  res.send({data: {name:'dino',email:'admin@123.com'}});
};
exports.show = show;

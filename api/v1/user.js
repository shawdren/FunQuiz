var _            = require('lodash');
var userProxy    = require('../../proxy').User;
//var moudels = require('../../models');
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
userProxy.newAndSave('admin','admin','password','admin@test.com',function(){console.log('insert data to db');});
userProxy.getUsers();
var show = function (req, res, next) {
  res.send({data: {name:'dino',email:'admin@123.com'}});
};
exports.show = show;

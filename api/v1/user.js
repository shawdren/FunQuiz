var _ = require('lodash');
var userProxy = require('../../proxy').User;
var help = require('../../common/helper');
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
//userProxy.newAndSave('admin','admin','password','admin@test.com',function(){console.log('insert data to db');});
//userProxy.getUsers();
var show = function (req, res, next) {
  userProxy.getUsers(function (err, users) {
    res.send(users);
  });
};

exports.show = show;

var login = function (req, res, next) {
  var d = {};
  if (help.isEmpty(req.body.email)) {
    res.send(help.require(req.body.email));
  }
  if (help.isEmpty(req.body.password)) {
    res.send(help.require(req.body.password));
  }
  userProxy.getUserByMail(req.body.email, function (err, user) {
    if (err != null) {
      d.status = help.fail(err);
      res.send(d);
    }
    if (user.pass === req.body.password) {
      d.status = help.success();
      d.data = user;
    } else {
      d.status = help.login('password is incorrect!');
    }
    res.send(d);
  })
};

exports.login = login;

var register = function (req, res, next) {
  var d = {};
  if (help.isEmpty(req.body.email)) {
    res.send(help.require(req.body.email));
  }
  if (help.isEmpty(req.body.password)) {
    res.send(help.require(req.body.password));
  }
  userProxy.register(req.body.email, req.body.password, function (err, users) {
    if (err != null) {
      d.status = help.fail(err);
    }
    d.status = help.success();
    d.data = users;
    res.send(d);
  });
};

exports.register = register;
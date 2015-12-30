var _ = require('lodash');
var userProxy = require('../../proxy').User;
var help = require('../../common/helper');

var get = function (req, res, next) {
    var d = {};
    if (help.isEmpty(req.body.email)) {
        res.send(help.require('email'));
    }
    userProxy.getUserByMail(req.body.email, function (err, users) {
        if (err != null) {
            d.status = help.fail(err);
        }
        d.status = help.success();
        d.data = users;
        res.send(d);
    });
};

exports.get = get;

var login = function (req, res, next) {
    var d = {};
    if (help.isEmpty(req.body.email)) {
        res.send(help.require('email'));
    }
    if (help.isEmpty(req.body.password)) {
        res.send(help.require('password'));
    }
    userProxy.getUserByMail(req.body.email, function (err, user) {
        if (err != null) {
            d.status = help.fail(err);
            res.send(d);
            return;
        }
        if (!user) {
            d.status = help.login('user does not exists!');
            res.send(d);
            return;
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
        res.send(help.require('email'));
    }
    if (help.isEmpty(req.body.password)) {
        res.send(help.require('password'));
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

exports.updateQuiz = function (req, res, next) {
    var d = {};
    if (help.isEmpty(req.body.email)) {
        res.send(help.require('email'));
    }
    userProxy.updateQuiz(req.body.email, req.body.isRight, req.body.combo, function (err, quiz) {
        if (err != null) {
            d.status = help.fail(err);
        }
        d.status = help.success();
        d.data = quiz;
        res.send(d);
    });
};;
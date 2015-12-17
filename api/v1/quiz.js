var _ = require('lodash');
var quizProxy = require('../../proxy').Quiz;
var help = require('../../common/helper');


var getQuiz = function (req, res, next) {
  var d = {};
  quizProxy.getQuiz(req.body.query, function (err, quiz) {
    if (err != null) {
      d.status = help.fail(err);
    }
    d.status = help.success();
    d.data = quiz;
    res.send(d);
  });
};

exports.getQuiz = getQuiz;

var addQuiz = function (req, res, next) {
  var d = {};
  quizProxy.addQuiz(req.body.query, function (err, quiz) {
    if (err != null) {
      d.status = help.fail(err);
    }
    d.status = help.success();
    d.data = quiz;
    res.send(d);
  });
};

exports.addQuiz = addQuiz;

var deleteQuiz = function (req, res, next) {
  var d = {};
  quizProxy.deleteQuiz(req.body.query, function (err, quiz) {
    if (err != null) {
      d.status = help.fail(err);
    }
    d.status = help.success();
    d.data = quiz;
    res.send(d);
  });
};

exports.deleteQuiz = deleteQuiz;

var updateQuiz = function (req, res, next) {
  var d = {};
  quizProxy.updateQuiz(req.body.query, function (err, quiz) {
    if (err != null) {
      d.status = help.fail(err);
    }
    d.status = help.success();
    d.data = quiz;
    res.send(d);
  });
};

exports.updateQuiz = updateQuiz;


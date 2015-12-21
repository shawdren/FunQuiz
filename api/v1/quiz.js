var _ = require('lodash');
var quizProxy = require('../../proxy').Quiz;
var help = require('../../common/helper');



exports.get = function (req, res, next) {
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

exports.getAll = function (req, res, next) {
  var d = {};
  quizProxy.getAll(req.body.query, function (err, quiz) {
    if (err != null) {
      d.status = help.fail(err);
    }
    d.status = help.success();
    d.data = quiz;
    res.send(d);
  });
};;


var add = function (req, res, next) {
  var d = {};
  if (help.isEmpty(req.body.quiz)) {
    res.send(help.require('quiz'));
  }
  if (req.body.answer.length == 0) {
    res.send(help.require('answer'));
  }
  if (help.isEmpty(req.body.rightAnswer)) {
    res.send(help.require('right answer'));
  }
  quizProxy.addQuiz(req.body.quiz, req.body.answer, req.body.rightAnswer, req.body.category, req.body.tag, function (err, quiz) {
    if (err != null) {
      d.status = help.fail(err);
      res.send(d);
      return;
    }
    d.status = help.success();
    d.data = quiz;
    res.send(d);
  });
};

exports.add = add;

exports.updateQuiz = function (req, res, next) {
  var d = {};
  if (help.isEmpty(req.body.quizId)) {
    res.send(help.require('quizId'));
  }
  quizProxy.updateQuiz(req.body.quizId,req.body.isRight, function (err, quiz) {
    if (err != null) {
      d.status = help.fail(err);
    }
    d.status = help.success();
    d.data = quiz;
    res.send(d);
  });
};
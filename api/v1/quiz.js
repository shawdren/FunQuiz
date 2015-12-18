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
};;

var add = function (req, res, next) {
  var d = {};
  quizProxy.addQuiz(req.body.quiz, req.body.answer, req.body.rightAnswer, req.body.category, function (err, quiz) {
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
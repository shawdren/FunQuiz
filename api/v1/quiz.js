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
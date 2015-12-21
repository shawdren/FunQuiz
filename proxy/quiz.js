var models = require('../models');
var Quiz = models.Quiz;
var uuid = require('node-uuid');

exports.getQuiz = function (query, callback) {
  Quiz.findOne(query, callback);
};

exports.getAll = function (query, callback) {
  Quiz.find(query, '', {}, callback);
};

exports.addQuiz = function (quiz, answer, rightAnswer, category, tag, callback) {
  var q = new Quiz();
  q.quiz = quiz;
  q.answer = answer;
  q.right_answer = rightAnswer;
  q.category = category;
  q.accessToken = uuid.v4();
  q.tag = tag;
  q.save(callback);
};

exports.updateQuiz = function (quizId, isRight, callback) {

  Quiz.findOne({ _id: quizId }, function (err, quiz) {
    if (err || !quiz) {
      return callback(err);
    }
    if (isRight) {
      quiz.right_count += 1;
    }
    quiz.quiz_count += 1;
    quiz.rank = Math.round(quiz.right_count / quiz.quiz_count);
    quiz.update_at = new Date();
    quiz.save(callback);
  });
};

exports.deleteQuiz = function (query, callback) {
  Quiz.findOne(query, callback);
};
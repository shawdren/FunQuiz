var models = require('../models');
var Quiz = models.Quiz;
var uuid = require('node-uuid');

exports.getQuiz = function (query, callback) {
  Quiz.findOne(query, callback);
};

exports.addQuiz = function (quiz, answer,rightAnswer, category, callback) {
  var q = new Quiz();
  q.quiz = quiz;
  q.answer = answer;
  q.right_anser = rightAnswer;
  q.category = category;
  q.quiz = uuid.v4();
  q.save(callback);
};

exports.updateQuiz = function (query, callback) {
  Quiz.findOne(query, callback);
};

exports.deleteQuiz = function (query, callback) {
  Quiz.findOne(query, callback);
};
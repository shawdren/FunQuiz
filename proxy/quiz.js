var models  = require('../models');
var Quiz    = models.Quiz;
var uuid    = require('node-uuid');

exports.getQuiz = function (query, callback) {
  Quiz.findOne(query, callback);
};

exports.addQuiz = function (query, callback) {
  Quiz.findOne(query, callback);
};

exports.updateQuiz = function (query, callback) {
  Quiz.findOne(query, callback);
};

exports.deleteQuiz = function (query, callback) {
  Quiz.findOne(query, callback);
};
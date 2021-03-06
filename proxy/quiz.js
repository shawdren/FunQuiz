var models = require('../models');
var Quiz = models.Quiz;
var uuid = require('node-uuid');
var _ = require('lodash');

exports.getQuiz = function (query, callback) {
    Quiz.findOne(query, callback);
};

exports.getCategory = function (query, callback) {
    var data = {};
    Quiz.find(function (err, quiz) {
        if (err || !quiz) {
            return callback(err);
        }
        var tag = [];
        tag.push('无标签');
        var category = [];
        category.push('无分类');
        _.forEach(quiz, function (d) {
            if (d._doc.tag !== null && d._doc.tag !== '' && d._doc.tag !== undefined
                && tag.indexOf(d._doc.tag) === -1) {
                tag.push(d._doc.tag);
            }
            if (d._doc.category !== null && d._doc.category !== '' && d._doc.category !== undefined
                && category.indexOf(d._doc.category) === -1) {
                category.push(d._doc.category);
            }
        });

        data.tag = tag;
        data.category = category;
        callback(err, data);
    });
};


exports.getAll = function (query, callback) {
    var filter = undefined;
    if (query.filter.indexOf('无标签') !== -1 || query.filter.indexOf('无分类') !== -1
    || query.filter.indexOf('last') > 0) {
        filter = undefined;
    } else {
        filter = JSON.parse(query.filter);
    }

    Quiz.find(filter, null, { sort: '-create_at' }, callback);
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
        quiz.rank = Math.round(quiz.right_count / quiz.quiz_count * 100);
        quiz.update_at = new Date();
        quiz.save(callback);
    });
};

exports.deleteQuiz = function (query, callback) {
    Quiz.findOne(query, callback);
};
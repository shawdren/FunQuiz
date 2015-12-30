var models = require('../models');
var User = models.User;
var uuid = require('node-uuid');

exports.getAll = function (query, callback) {
    User.find(query, '', {}, callback);
};

exports.getUserByMail = function (email, callback) {
    User.findOne({ email: email }, callback);
};

exports.register = function (email, pass, callback) {
    var user = new User();
    user.pass = pass;
    user.email = email;
    user.accessToken = uuid.v4();
    user.save(callback);
};

exports.updateQuiz = function (email, isRight, combo, callback) {
    User.findOne({ email: email }, function (err, user) {
        if (err || !user) {
            return callback(err);
        }
        if (isRight) {
            user.right_count += 1;
        }
        if (user.combo_count <= combo) {
            user.combo_count = combo;
        }
        user.quiz_count += 1;
        user.score += 1;
        user.level = Math.round(user.right_count / user.quiz_count * 100);
        user.save(callback);
    });
};
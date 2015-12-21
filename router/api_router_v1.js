var express           = require('express');
var apiUser    = require('../api/v1/user');
var apiQuiz    = require('../api/v1/quiz');
var config            = require('../config');

var router            = express.Router();

router.get('/user', apiUser.show);
router.post('/user/login', apiUser.login);
router.post('/user/register', apiUser.register);
router.post('/user/updatequiz', apiUser.updateQuiz);

router.get('/quiz/get', apiQuiz.get);
router.get('/quiz/getall', apiQuiz.getAll);
router.post('/quiz/add', apiQuiz.add);
router.post('/quiz/updatequiz', apiQuiz.updateQuiz);


module.exports = router;

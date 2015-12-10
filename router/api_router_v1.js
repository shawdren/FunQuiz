var express           = require('express');
var apiUser    = require('../api/v1/user');
var config            = require('../config');

var router            = express.Router();

router.get('/user', apiUser.show);
router.post('/user/login', apiUser.login);

module.exports = router;

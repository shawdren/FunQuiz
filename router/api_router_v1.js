var express           = require('express');
var userController    = require('../api/v1/user');
var config            = require('../config');

var router            = express.Router();

router.get('/user', userController.show);

module.exports = router;


var express = require('express');
var path = require('path');
 
var router = express.Router();

// set static directories
router.use(express.static(path.join(__dirname, 'dist')));
router.get('/', function (req, res) {
    res.redirect('/dist/app/views');
});

module.exports = router;

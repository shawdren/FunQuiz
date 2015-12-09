
var express = require('express');
var path = require('path');
 
var router = express.Router();

// set static directories
router.use(express.static(path.join(__dirname, 'dist')));

router.get('/', function (req, res) {
    console.log(__dirname);
    var dirName = __dirname.substring(0,__dirname.length - 7);
    //res.sendFile(path.join(dirName+ '/dist/app/views/index.html'));
});

module.exports = router;

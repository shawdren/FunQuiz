'use strict';
/*
var mongoose = require('mongoose');
var config   = require('./config');

mongoose.connect(config.testDb, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);


exports.smallSave = function (err) {
  var small = new Tank({ size: 'small' });
  small.save(function (err) {
  if (err) console.log(err);
  // saved!
  var tank = Tank.find({ size: 'small' }).exec();
  console.log('after save.......:');
  console.log(tank);
  });
};

exports.getTanks = function(){
  console.log(Tank.find());
};
*/

//Tank.find({ size: 'small' });
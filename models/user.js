var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;

var UserSchema = new Schema({
  name: 'string',
  loginName: 'string',
  pass: 'string',
  email: 'string',
  accessToken: 'string'
});

//UserSchema.plugin(BaseModel);

//UserSchema.index({loginname: 1}, {unique: true});
//UserSchema.index({email: 1}, {unique: true});

mongoose.model('User', UserSchema);

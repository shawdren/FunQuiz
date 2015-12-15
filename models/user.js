var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String },
  pass: { type: String },
  email: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  quiz_count: { type: Number, default: 0 },
  right_count: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  level: { type: String },
  active: { type: Boolean, default: true },
  accessToken: {type: String},
});

UserSchema.plugin(BaseModel);

<<<<<<< HEAD
//UserSchema.index({loginname: 1}, {unique: true});
//UserSchema.index({email: 1}, {unique: true});
=======
UserSchema.index({email: 1}, {unique: true});
>>>>>>> origin/master

mongoose.model('User', UserSchema);

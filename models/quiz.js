var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
  quiz: { type: String },
  answer: { type: Array },
  right_answer: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  quiz_count: { type: Number, default: 0 },
  right_count: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  category: { type: String },
  tag: { type: String },
  active: { type: Boolean, default: true },
  accessToken: {type: String},
});

QuizSchema.plugin(BaseModel);

QuizSchema.index({email: 1}, {unique: true});

mongoose.model('Quzi', QuizSchema);

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

commentSchema.methods.isOwnedBy = function(user) {
  return this.user && user._id.equals(this.user._id);
};

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  title: { type: String, minlength: 2, required: true},
  image: { type: String, pattern: /^https?:\/\/.+/ },
  date: { type: String},
  performer1: { type: String, minglength: 2, required: true},
  performer2: { type: String, minglength: 2, required: true},
  performer3: { type: String, minglength: 2},
  description: {type: String, maxlength: 560},
  comments: [ commentSchema ]
});

schema.methods.isOwnedBy = function(user) {
  return this.user && user._id.equals(this.user_id);
};

module.exports = mongoose.model('Concert', schema);

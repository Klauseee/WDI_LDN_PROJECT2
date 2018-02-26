const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String, minlength: 2, required: true},
  image: { type: String, pattern: /^https?:\/\/.+/ },
  date: { type: String},
  performer1: { type: String, minglength: 2, required: true},
  performer2: { type: String, minglength: 2, required: true},
  performer3: { type: String, minglength: 2},
  description: {type: String, maxlength: 560}
});

module.exports = mongoose.model('Concert', schema);

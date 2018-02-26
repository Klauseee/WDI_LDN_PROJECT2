const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  image: { type: String, pattern: /^https?:\/\/.+/ },
  date: { type: String},
  title: { type: String, minlength: 2, required: true},
  performer1: { type: String, minglength: 2, required: true},
  performer2: { type: String, minglength: 2, required: true},
  performer3: { type: String, minglength: 2}

});

module.exports = mongoose.model('Concert', schema);

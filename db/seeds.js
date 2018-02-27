const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Concert = require('../models/concert');
const concertData = require('./data/concerts');
const User = require('../models/user');
const userData = require('./data/users');

mongoose.connect('mongodb://localhost/bach-database', (err, db) => {
  db.dropDatabase();
  Concert.create(concertData)
    .then(concerts => console.log(`${concerts.length} concerts created`))
    .catch(console.log(err))
    .finally(() => mongoose.connection.close());
  User.create(userData)
    .then(users => console.log(users))
    .catch(console.log(err))
    .finally(() => mongoose.connection.close());

});

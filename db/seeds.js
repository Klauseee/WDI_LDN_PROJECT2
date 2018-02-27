const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Concert = require('../models/concert');
const concertData = require('./data/concerts');
const User = require('../models/user');
const userData = require('./data/users');
const Category = require('../models/category');
const categoryData = require('./data/categories');

mongoose.connect('mongodb://localhost/bach-database', (err, db) => {
  db.dropDatabase();

  Category.create(categoryData)
    .then(categories => {
      console.log(`${categories.length} categories created`);

      concertData[0].category = categories[0];
      concertData[1].category = categories[1];

      return Concert.create(concertData);
    })
    .then(concerts => {
      console.log(`${concerts.length} concerts created`);
      return User.create(userData);
    })
    .then(users => console.log(`${users.length} users created`))
    .catch(console.log(err))
    .finally(() => mongoose.connection.close());

});

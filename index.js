const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const session = require('express-session');

const flash = require('express-flash');
const userAuth = require('./lib/userAuth');

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const router = require('./config/router');

const app = express();

// heroku's port number or our local port number
const PORT = process.env.PORT || 8000;

// heroku's cloud database or our local database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bach-database');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: 'GysHa^72u91sk0P(', // a random key used to encrypt the session cookie
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(userAuth);

app.use(router);

app.use((err, req, res, next) => { // eslint-disable-line
  if(err.name === 'ValidationError') return res.render('pages/422');
  res.render('pages/500', { err });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

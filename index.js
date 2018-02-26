const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const router = require('./config/router');

const app = express();

const PORT = 8000;

mongoose.connect('mongodb://localhost/bach-database');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.use(router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

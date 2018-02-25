const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const router = require('./config/router');

const app = express();

const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

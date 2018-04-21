const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
const connectDB = require('./config/db')(app);
const employee = require('./controllers/employees')(app);
const portofolio = require('./controllers/portofolios')(app);
const handlingError = require('./config/handling-error')(app);
const port = require('./config/port')(app);
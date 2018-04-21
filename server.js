const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.json({ message: "Welcome To My API" })
});

// Routes
const connectDB = require('./config/db')(app);
const employee = require('./controllers/employees')(app);
const portofolio = require('./controllers/portofolio')(app);
const handlingError = require('./config/handling-error')(app);

app.listen(PORT, () => {
  console.log(`Server is Running PORT ${PORT}`);
});
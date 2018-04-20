const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


mongoose.connect('mongodb://indra-gunawan:admin@ds251889.mlab.com:51889/gits-indonesia', () => {
  console.log('Connecting To MongoDB OK');
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: "Welcome To My API" })
});

// Routes
const employee = require('./controllers/employees')(app);

app.listen(PORT, () => {
  console.log(`Server is Running PORT ${PORT}`);
});
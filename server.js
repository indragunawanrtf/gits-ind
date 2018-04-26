const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use('/public/uploads', express.static('public/uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const connectDB = require('./config/db')(app);
const port = require('./config/port')(app);

const UserRoutes = require('./routes/users');
const PortofolioRoutes = require('./routes/portofolios');
const EmployeeRoutes = require('./routes/employees');

app.use('/api/users', UserRoutes);
app.use('/api/portofolios', PortofolioRoutes);
app.use('/api/employees', EmployeeRoutes);
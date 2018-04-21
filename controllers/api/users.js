const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/users')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
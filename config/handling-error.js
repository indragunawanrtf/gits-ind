const express = require('express');

const app = express();

module.exports = app => {
  app.use((req, res, next) => {
    const error = new Error("Sorry, What you're looking for does not exist");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

}
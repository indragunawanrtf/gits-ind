const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/users");

module.exports = app => {
  
  // POST API User
  app.post("/api/users/signup", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Email Already Exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash
              });
              newUser
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User Success Created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });

};
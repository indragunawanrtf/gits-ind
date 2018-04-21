const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

  // Login API User
  app.post("/api/users/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Sorry, Authentication Failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Sorry, Authentication Failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Authentication Successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Sorry, Authentication Failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  // DELETE API User
  app.delete("/api/users/signup/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User Success Deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

};

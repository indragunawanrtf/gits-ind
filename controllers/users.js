const User = require("../models/users");

module.exports = app => {

  // POST API User
  app.post("/api/users", (req, res) => {
    const newUser = new User(req.body);
    newUser
      .save()
      .then(() => {
        res.json({ message: "User Success Created" });
      })
      .catch(err => {
        console.error(err);
      });
  });

};

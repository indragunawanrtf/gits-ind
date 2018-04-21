const Portofolio = require("../models/portofolio");

module.exports = app => {
  // GET API Portofolio
  app.get("/api/portofolio", (req, res) => {
    Portofolio.find()
      .then(portofolio => {
        res.json(portofolio);
      })
      .catch(err => {
        console.error(err);
      });
  });
  
};

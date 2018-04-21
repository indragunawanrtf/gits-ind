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

  // POST API Portofolio
  app.post("/api/portofolio", (req, res) => {
    const newPortofolio = new Portofolio(req.body);
    newPortofolio.save().then(() => {
      res.json({ message: "Portofolio Success Created"});
    }).catch(err => {
      console.error(err);
    });
  });
  
  // UPDATE API Portofolio
  app.put('/api/portofolio', (req, res) => {
    Portofolio.update({ _id: req.params.id }, req.body)
    .then(() => {
      res.json({ message: "Portofolio Success Updated"})
    })
    .catch(err => {
      console.error(err);
    });
  });
  
};

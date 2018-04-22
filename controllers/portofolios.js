const Portofolio = require("../models/portofolios");
const checkAuth = require("../middleware/check-auth");

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
  app.post("/api/portofolio", checkAuth, (req, res) => {
    const newPortofolio = new Portofolio(req.body);
    newPortofolio
      .save()
      .then(() => {
        res.json({ message: "Portofolio Success Created" });
      })
      .catch(err => {
        console.error(err);
      });
  });

  // PUT API Portofolio
  app.put("/api/portofolio/:id", checkAuth, (req, res) => {
    Portofolio.update({ _id: req.params.id }, req.body)
      .then(() => {
        res.json({ message: "Portofolio Success Updated" });
      })
      .catch(err => {
        console.error(err);
      });
  });

  // DELETE API Portofolio
  app.delete("/api/portofolio/:id", checkAuth, (req, res) => {
    Portofolio.remove({ _id: req.params.id })
      .then(() => {
        res.json({ message: "Portofolio Success Deleted" });
      })
      .catch(err => {
        console.err(err);
      });
  });
  
};

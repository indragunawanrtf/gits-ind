const mongoose = require("mongoose");

const Portofolio = require("../models/portofolios");
const checkAuth = require("../middleware/check-auth");

module.exports = app => {
  // GET API All Data Portofolio
  app.get("/api/portofolio", (req, res) => {
    Portofolio.find()
      .then(portofolio => {
        res.json(portofolio);
      })
      .catch(err => {
        console.error(err);
      });
  });

  // GET API Portofolio By ID
  app.get("/api/portofolio/:id", (req, res) => {
    Portofolio.findById({ _id: req.params.id })
      .then(portofolio => {
        res.json(portofolio);
      })
      .catch(err => {
        console.error(err);
      });
  });

  // POST API Portofolio
  app.post("/api/portofolio", checkAuth, (req, res) => {
    const newPortofolio = new Portofolio({
      _id: new mongoose.Types.ObjectId(),
      name_project: req.body.name_project,
      description: req.body.description
    });
    newPortofolio
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /portofolio",
          createdPortofolio: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
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

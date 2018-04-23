const mongoose = require("mongoose");

const Portofolio = require("../models/portofolios");
const checkAuth = require("../middleware/check-auth");

module.exports = app => {
  // GET API All Data Portofolio
  app.get("/api/portofolio", (req, res, next) => {
    Portofolio.find()
      .select('name_project description _id')
      .exec()
      .then(portofolio => {
        const response = {
          count: portofolio.length,
          portofolios: portofolio
        }
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  // GET API Portofolio By ID
  app.get("/api/portofolio/:id", (req, res, next) => {
    const id = req.params.id
    Portofolio.findById(id)
      .select('name_project description _id')
      .exec()
      .then(portofolio => {
        console.log("From Database", portofolio);
        if (portofolio) {
          res.status(200).json(portofolio);
        } else {
          res.status(404).json({ message: "No Valid entry found for Provided ID" })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  // POST API Portofolio
  app.post("/api/portofolio", checkAuth, (req, res, next) => {
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
          message: "Created Portofolio Successfully",
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
  app.put("/api/portofolio/:id", checkAuth, (req, res, next) => {
    Portofolio.update({ _id: req.params.id }, req.body)
      .then(() => {
        res.json({ message: "Portofolio Success Updated" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  // DELETE API Portofolio
  app.delete("/api/portofolio/:id", checkAuth, (req, res, next) => {
    Portofolio.remove({ _id: req.params.id })
      .then(() => {
        res.json({ message: "Portofolio Success Deleted" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
};
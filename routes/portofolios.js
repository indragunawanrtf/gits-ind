const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Portofolio = require("../models/portofolios");
const checkAuth = require("../middleware/check-auth");

const PortofoliosController = require("../controllers/portofolios");

router.get("/", PortofoliosController.portofolios_get_all);
router.get("/:id", PortofoliosController.portofolios_get_id);
router.post("/", checkAuth, PortofoliosController.portofolios_create);
router.put("/:id", checkAuth, PortofoliosController.portofolios_update);
router.delete("/:id", checkAuth, PortofoliosController.portofolios_delete);

module.exports = router;

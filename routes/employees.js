const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const EmployeesController = require("../controllers/employees");

// For file Data
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Reject a File
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

router.get("/", EmployeesController.employees_get_all);
router.get("/:id", EmployeesController.employees_get_id);
router.post("/", checkAuth, upload.single("employeeImage"), EmployeesController.employees_create);
router.put("/:id", checkAuth, upload.single("employeeImage"), EmployeesController.employees_update);
router.delete("/:id", checkAuth, EmployeesController.employees_delete);

module.exports = router;
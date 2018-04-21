const Employee = require("../models/employees");
const multer = require("multer");

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

module.exports = app => {
  //GET API Employee
  app.get("/api/employees", (req, res) => {
    Employee.find()
      .then(employees => {
        res.json(employees);
      })
      .catch(err => {
        console.error(err);
      });
  });

  // Post API Employee
  app.post("/api/employees", upload.single("employeeImage"), (req, res) => {
    const newEmployee = new Employee(req.body);
    newEmployee
      .save()
      .then(() => {
        res.json({ message: "Employees Success Created" });
      })
      .catch(err => {
        console.error(err);
      });
  });

  // PUT API Employee
  app.put("/api/employees/:id", (req, res) => {
    Employee.update({ _id: req.params.id }, req.body)
      .then(() => {
        res.json({ message: "Employees Success Updated " });
      })
      .catch(err => {
        console.error(err);
      });
  });

  // DELETE API Employee
  app.delete("/api/employees/:id", (req, res) => {
    Employee.remove({ _id: req.params.id })
      .then(() => {
        res.json({ message: "Employees Success Deleted" });
      })
      .catch(err => {
        console.error(err);
      });
  });
};

const mongoose = require('mongoose');

const Employee = require("../models/employees");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

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
  //GET API All Data Employee
  app.get("/api/employees", (req, res, next) => {
    Employee.find()
      .select(
        "_id name address gender expert department region bio employeeImage"
      )
      .exec()
      .then(employees => {
        const response = {
          count: employees.length,
          portofolios: employees.map(employee => {
            return {
              _id: employee.id,
              name: employee.name,
              address: employee.address,
              gender: employee.gender,
              expert: employee.expert,
              department: employee.department,
              region: employee.region,
              bio: employee.bio,
              employeeImage: employee.employeeImage
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  // GET API Employee By ID
  app.get("/api/employees/:id", (req, res, next) => {
    const id = req.params.id;
    Employee.findById(id)
      .select(
        "_id name address gender expert department region bio employeeImage"
      )
      .exec()
      .then(employees => {
        console.log("From Database", employees);
        if (employees) {
          res.status(200).json(employees);
        } else {
          res
            .status(404)
            .json({ message: "No Valid entry found for Provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  // Post API Employee
  app.post(
    "/api/employees",
    checkAuth,
    upload.single("employeeImage"),
    (req, res, next) => {
      const newEmployee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        gender: req.body.gender,
        expert: req.body.expert,
        department: req.body.department,
        region: req.body.region,
        bio: req.body.bio,
        employeeImage: req.file.path
      });
      newEmployee
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Employees Success Created"
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    }
  );

  // PUT API Employee
  app.put("/api/employees/:id", checkAuth, (req, res, next) => {
    Employee.update({ _id: req.params.id }, req.body)
      .then(() => {
        res.json({ message: "Employees Success Updated " });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  // DELETE API Employee
  app.delete("/api/employees/:id", checkAuth, (req, res, next) => {
    Employee.remove({ _id: req.params.id })
      .then(() => {
        res.json({ message: "Employees Success Deleted" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
};

const Employee = require("../models/employees");

module.exports = app => {

  // Post API Employee
  app.post("/api/employees", (req, res) => {
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
  
};

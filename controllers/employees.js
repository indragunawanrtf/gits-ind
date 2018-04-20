const Employee = require("../models/employees");

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
  app.delete('/api/employees/:id', (req, res) => {
    Employee.remove({ _id: req.params.id }).then(() => {
      res.json({ message: "Employees Success Deleted" });
    }).catch(err => {
      console.error(err);
    })
  })

};

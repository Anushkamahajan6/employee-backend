import db from "./db.js";
import express from "express";
import cors from "cors";
db.connect();
const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());

app.post("/api/employee", (req, res) => {
  console.log(req.body);
  const { id, name, age, country, state, city, address } = req.body;
  const check = `SELECT * FROM employee where name="${name}" and address="${address}" and city="${city}" and state="${state}" and country="${country}" and age="${age}"`;
  db.query(check, [name, address, city, state, country, age], (err, result) => {
    if (err) return res.status(202).json({ error: err.message });
    //console.log("Error", err);
    console.log("Result:", result);
    if (result.length == 0) {
      const sql = `INSERT INTO employee (id, name, address,city, state,country , age) VALUES ("${id}","${name}","${address}","${city}","${state}","${country}","${age}")`;
      console.log(sql);
      db.query(
        sql,
        [id, name, age, country, state, city, address],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res
            .status(201)
            .json({ message: "Employee added", id: result.insertId });
        }
      );
    } else res.json({ message: "Same Employee can't be entered again" });
  });
});

app.delete("/api/employee/:id", (req, res) => {
  const employeeId = req.params.id;
  const sql = `DELETE FROM employee WHERE ID=?`;
  db.query(sql, [employeeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted successfully" });
  });
});

app.get("/api/employee", (req, res) => {
  const sql = `SELECT ID as id, name, address, city, state, country, age FROM employee`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // results array with lowercase 'id'
  });
});

app.get("/api/employee/:id", (req, res) => {
  const employeeId = req.params.id; // lowercase param name in URL
  const sql = `SELECT ID as id, name, address, city, state, country, age FROM employee WHERE ID = ?`;
  db.query(sql, [employeeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // results is an array, frontend expects data[0]
  });
});
app.put("/api/employee/:id", (req, res) => {
  const employeeId = req.params.id; // from URL
  const { name, address, city, state, country, age } = req.body;

  const sql = `UPDATE employee SET name=?, address=?, city=?, state=?, country=?, age=? WHERE ID=?`;
  db.query(
    sql,
    [name, address, city, state, country, age, employeeId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee updated successfully" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

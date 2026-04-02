const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
})

router.post("/", (req, res) => {
  const { task } = req.body;

  db.query(
    "INSERT INTO tasks (task) VALUES (?)",
    [task],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Task added" });
    }
  );
});

router.put("/:id", (req, res) => {
  const { task } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE tasks SET task = ? WHERE id = ?",
    [task, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Task updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM tasks WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Task deleted" });
    }
  );
});

module.exports = router;





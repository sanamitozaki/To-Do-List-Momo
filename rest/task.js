const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM tasks ORDER BY id DESC",
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
})

router.post("/", (req, res) => {
  const { task, user_name } = req.body;

  if (!task || !user_name) {
    return res.status(400).json({ message: "Task and user name are required" });
  }

  db.query(
    "INSERT INTO tasks (task, user_name) VALUES (?, ?)",
    [task, user_name],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Task added" });
    }
  );
});

router.put("/:id", (req, res) => {
  const { task, user_name } = req.body;
  const { id } = req.params;

  if (!task || !user_name) {
    return res.status(400).json({ message: "Task and user name are required" });
  }

  db.query(
    "UPDATE tasks SET task = ?, user_name = ? WHERE id = ?",
    [task, user_name, id],
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





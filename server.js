const express = require("express");
const cors = require("cors");
const app = express();

const tasksRoutes = require("./rest/task");

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/boardController.js");

//@Route: /tasks
router.route("/").get(getAllTasks).push(createTask);
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;

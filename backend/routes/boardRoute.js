const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  guestBoard,
} = require("../controllers/boardController");

//@Route: /tasks
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").put(updateTask).delete(deleteTask);
router.route("/guest").get(guestBoard);

module.exports = router;

const asyncHandler = require("express-async-handler");

const getAllTasks = asyncHandler(async (req, res) => {
  res.send("getAllTask");
});

const createTask = asyncHandler(async (req, res) => {
  res.send("create Task");
});

const updateTask = asyncHandler(async (req, res) => {
  res.send("update task by id");
});

const deleteTask = asyncHandler(async (req, res) => {
  res.send("delete task by id");
});
module.export = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};

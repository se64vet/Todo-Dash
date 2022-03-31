const asyncHandler = require("express-async-handler");
const {Board} = require("../models/boardModel");

//@route: GET /api/board
//@desc: get all tasks
const getAllTasks = asyncHandler(async (req, res) => {
  res.send("getAllTask");
});

//@route: POST /api/board
//@desc: create new task
const createTask = asyncHandler(async (req, res) => {
  res.send("create Task");
});

//@route: PUT /api/board/:id
//@desc: update task
const updateTask = asyncHandler(async (req, res) => {
  res.send("update task by id");
});

//@route: DELETE /api/board/:id
//@desc: delete task
const deleteTask = asyncHandler(async (req, res) => {
  res.send("delete task by id");
});

//-----------test
const guestBoard = asyncHandler(async (req, res) => {
  await Board.create({})
  const data = await Board.find({});
  res.json(data);
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  guestBoard,
};


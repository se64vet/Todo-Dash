const asyncHandler = require("express-async-handler");
const {Board} = require("../models/boardModel");



// @desc: guets initial board
// @route: GET api/board/guest
const guestBoard = asyncHandler(async (req, res) => {
  const newBoard = await Board.create({guest: true})
  const data = await Board.findById(newBoard._id);
  res.json(data);
});

// @desc: user intial board
// @route: GET api/board/user/:userId
const initialBoard = asyncHandler(async (req, res) => {
  const {userId} = req.params
  const newBoard = await Board.create({guest: false, user: userId})
  const data = await Board.findById(newBoard._id);
  res.json(data);
});

// @desc: user update board
// @route: PUT api/board/user/:userId
const updateBoard = asyncHandler(async (req, res) => {
  const {userId} = req.params
  const {updatedBoard} = req.body
  const data = await Board.findOneAndReplace({user: userId}, updatedBoard);
  res.json(data);
});
module.exports = {
  initialBoard,
  updateBoard,
  guestBoard,
};


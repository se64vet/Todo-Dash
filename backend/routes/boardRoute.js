const express = require("express");
const router = express.Router();
const {
  initialBoard,
  updateBoard,
  guestBoard,
} = require("../controllers/boardController");

//@Route: /api/board
router.route("/user/:userId").get(initialBoard).put(updateBoard);
router.route("/guest").get(guestBoard);

module.exports = router;

const asyncHandler = require("express-async-handler");
//@desc: create new user
//@route: POST /api/user
const registerUser = asyncHandler(async (req, res) => {
  //check if empty field
  //check if user exist
  //hash password using bcrypt
  //create user
  //send back success or fail
});

//@desc: user logging in
//@route: POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  //check if user exist
  //return object include user infos and token
});

//@desc: get user infos after logged in
//@route: GET /api/user/me
//@access: private - protected route
const getUser = asyncHandler(async (req, res) => {
  res.json("get user infos");
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT, {
    expriesIn: "1d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};

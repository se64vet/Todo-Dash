const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcrypt')
//@desc: create new user
//@route: POST /api/user
const registerUser = asyncHandler(async (req, res) => {
  const {name,email, password} =  req.body
  //check if empty field
  if(!name || !password){
    throw new Error("empty name or password!")
  }
  //check if user exist
  const data = User.find({email})
  if(data){
    throw new Error("user exist! login instead")
  }
  //hash password using bcrypt
  const salt= await bcrypt.genSalt(10)
  const hashedPassword=  await bcrypt.hash(password,salt)
  //create user
  const newUser = User.create({name, email, password: hashedPassword})
  //send back success or fail
  if(newUser){
    res.status(200).json({data: newUser})
  }
  else {
    res.status(400)
    throw new Error('invalid user data')
  }
});

//@desc: user logging in
//@route: POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  const {name, password} = req.body 
  //check if user exist
  const data = User.find({name})
  //return object include user infos and token
  if(!data){
    res.status(400).json({msg: "user not exist!, register instead"})
  }
  res.status(200).json(data)

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

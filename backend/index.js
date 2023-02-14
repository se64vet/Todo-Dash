const cors = require("cors");
const { json, urlencoded } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/connect.mongodb");
app.use(
  cors({
    origin: "https://todo-dash.onrender.com",
  })
);


// express built-in utils
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ board: initial_data });
});
app.use("/api/board", require("./routes/boardRoute")); //off load to route file
//app.use("/api/user", require("./routes/userRoute"));

//start server
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

start();

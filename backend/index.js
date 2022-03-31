const cors = require("cors");
const { json, urlencoded } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/connect.mongodb");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const initial_data = {
  "tasks": {
    "task-1": { "id": "task-1", "content": "create backend" },
    "task-2": { "id": "task-2", "content": "integrate frontend" },
    "task-3": { "id": "task-3", "content": "refactor & optimize" },
  },
  "column": {
    "column-1": { "id": "column-1", "title": "To Do", "tasksIds": ["task-3"] },
    "column-2": {
      "id": "column-2",
      "title": "In Progress",
      "tasksIds": ["task-2"],
    },
    "column-3": { "id": "column-3", "title": "Done", "tasksIds": ["task-1"] },
  },
  "columnOrder": ["column-1", "column-2", "column-3"],
};
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

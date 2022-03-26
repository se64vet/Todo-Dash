const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  id: String,
  content: String,
});

const columnSchema = new Schema({
  id: String,
  title: String,
  tasksIds: Array,
});

const boardSchema = new Schema({
  tasks: {
    type: Map,
    of: taskSchema,
  },
  column: {
    type: Map,
    of: columnSchema,
  },
  columnOrder: Array,
});

// create initial board
const initial_data = {
  tasks: {
    "task-1": { "id": "task-1", "content": "create backend" },
    "task-2": { "id": "task-2", "content": "integrate frontend" },
    "task-3": { "id": "task-3", "content": "refactor & optimize" },
  },
  column: {
    "column-1": { "id": "column-1", "title": "To Do", "tasksIds": ["task-3"] },
    "column-2": {
      "id": "column-2",
      "title": "In Progress",
      "tasksIds": ["task-2"],
    },
    "column-3": { "id": "column-3", "title": "Done", "tasksIds": ["task-1"] },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

boardSchema.methods.boardInit = function () {
  mongoose.model("Board").create(initial_data);
};

module.exports = mongoose.model("Board", boardSchema);
module.exports = mongoose.model("Task", taskSchema);
module.exports = mongoose.model("Column", columnSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  id: {
    type: String,
    required: [true, 'Missing Task Id!']
  },
  content: {
    type: String,
    required: [true, 'Missing Task content!']
  },
});

const columnSchema = new Schema({
  id: {
    type: String,
    required: [true, 'Missing column Id!']
  },
  title: {
    type: String,
    required: [true, 'Missing column Title!']
  },
  tasksIds: {
    type: Array,
    required: [true, 'Missing column tasksIds!']
  },
});



const boardSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: 'User',
      required: [true, 'no user id'],
      default: new mongoose.Types.ObjectId()
    },
    tasks: {
      type: Map,
      of: taskSchema, 
      default: {
        "task-1": { "id": "task-1", "content": "create backend" },
        "task-2": { "id": "task-2", "content": "integrate frontend" },
        "task-3": { "id": "task-3", "content": "refactor & optimize" },
      }
    }, 
    column: {
      type: Map, 
      of: columnSchema,
      default: {
        "column-1": { "id": "column-1", "title": "To Do", "tasksIds": ["task-3"] },
        "column-2": {
          "id": "column-2",
          "title": "In Progress",
          "tasksIds": ["task-2"],
        },
        "column-3": { "id": "column-3", "title": "Done", "tasksIds": ["task-1"] }
      }
    },
    columnOrder: {
      type: Array,
      required: [true, 'missing column order'],
      default: ["column-1", "column-2", "column-3"]
    }
  }, {strict: true}
);

// create initial board
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



const Board = mongoose.model("Board", boardSchema);
const Task = mongoose.model("Task", taskSchema);
const Column = mongoose.model("Column", columnSchema);

module.exports = {
  Board
}

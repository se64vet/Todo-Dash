const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',

}))

const initial_data = {
    'tasks': {
        'task-1': {'id': 'task-1', 'content': 'create backend'},
        'task-2': {'id': 'task-2', 'content': 'integrate frontend'},
        'task-3': {'id': 'task-3', 'content': 'refactor & optimize'}
    },
    'column': {
        'column-1': {'id': 'column-1', 'title': 'To Do', 'tasksIds': ['task-3']},
        'column-2': {'id': 'column-2', 'title': 'In Progress', 'tasksIds': ['task-2']},
        'column-3': {'id': 'column-3', 'title': 'Done', 'tasksIds': ['task-1']}
    },
    'columnOrder': ['column-1', 'column-2', 'column-3']
}


app.get('/', (req, res)=>{
   res.send({board: initial_data}) 
})


const PORT = process.env.PORT || 5000;
const start = ()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running on ${PORT}`);
    })
}

start();
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 1.5em;
  background-color: ${props => props.theme.primary};
  border: 2px solid ${props => props.theme.primaryText};
`;
const Title = styled.h1`
  padding: 1rem;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;

  @media only screen and (max-width: 768px){
    flex-direction: column;
  }
`;

const DeleteBtn = styled.div`
padding: 2em;
width: fit-content;
text-align: center;
`
const Board = () => {
  //states
  const initialState = { "tasks": {}, "column": {}, "columnOrder": [] };
  const [board, setBoard] = useState(initialState);
  const [displayDeleteBtn, setDisplayDeleteBtn] = useState(false);


  //component life-cycle
  useEffect(() => {
    fetchGuestBoard().then((data) => setBoard(data));
  }, []);

  //functions
  const fetchGuestBoard = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/board/guest");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const onDragStart = (result)=>{
    if(result.type === 'task'){
      setDisplayDeleteBtn(true);
    }
    
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    setDisplayDeleteBtn(false);
    //no destination drop
    if (!destination) {
      return;
    }
    //case drag and drop the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    //drag&drop columns
    if (type === "column") {
      const newColumnOrder = [...board.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoard({ ...board, columnOrder: newColumnOrder });
      return;
    }

    //drag&drop tasks
    //--we don't need if(type === 'task') here
    //--because there're only 2 type, if !column then it's task
    const startColumn = board.column[source.droppableId];
    const endColumn = board.column[destination.droppableId];

   

    //moving task in the same column
    if (startColumn === endColumn) {
      const newTasksIds = startColumn.tasksIds;
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, tasksIds: newTasksIds };
      setBoard({
        //updating column section, not task or order
        ...board,
        column: {
          //updating specific column in columns
          ...board.column,
          [newColumn.id]: newColumn,
        },
      });
    }
   

    //moving task accross columns
    if (startColumn !== endColumn) {

      // DELETE TASK
      if(destination.droppableId === 'deleteTask'){
        const newBoard = {...board}
        // delete task in tasks list
        let newTasksList = board.tasks;
        delete newTasksList[draggableId]
        // remove task id in column
        let {tasksIds} = startColumn;
        let newStartTasksIds = tasksIds.filter(task => task != draggableId);
        const newStartColumn = { ...startColumn, tasksIds: newStartTasksIds };

        // update Board
        setBoard({
          ...board,
          column: {
            ...board.column,
            [newStartColumn.id]: newStartColumn,
          },
          tasks: newTasksList,
        });
       return;
     }

     // MOVE TASKS
      const newStartTasksIds = startColumn.tasksIds;
      const newEndTasksIds = endColumn.tasksIds;
      newStartTasksIds.splice(source.index, 1);
      newEndTasksIds.splice(destination.index, 0, draggableId);

      const newStartColumn = { ...startColumn, tasksIds: newStartTasksIds };
      const newEndColumn = { ...endColumn, tasksIds: newEndTasksIds };

      setBoard({
        ...board,
        column: {
          ...board.column,
          [newStartColumn.id]: newStartColumn,
          [newEndColumn.id]: newEndColumn,
        },
      });
    }
    
  };

  function addNewTask(newTask, colId) {
    const newTodo = board.column[colId];
    newTodo.tasksIds.push(newTask.id);
    setBoard({
      ...board,
      tasks: {
        ...board.tasks,
        [newTask.id]: newTask,
      },
      column: {
        ...board.column,
        [newTodo.id]: newTodo,
      },
    });
  }
  return (
    <Container>
      <Title>
        <h1>Todo Dash</h1>
        <p style={{fontSize: "large",fontWeight: "normal", fontStyle: "italic", textAlign: "center"}}>Minimalist todo app</p>
      </Title>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId="mainBoard" type="column" direction="horizontal">
          {(provided) => (
       
            <Main {...provided.droppableProps} ref={provided.innerRef}>
              {board.columnOrder.map((columnId, idx) => (
                <Column
                  key={columnId}
                  column={board.column[columnId]}
                  tasks={board.tasks}
                  addNewTask={addNewTask}
                  index={idx}
                />
              ))}
              {provided.placeholder}
            </Main>
          )}
        </Droppable>

         <Droppable droppableId="deleteTask" type="task">
          {(provided)=> (
           <DeleteBtn 
           {...provided.droppableProps} 
           ref={provided.innerRef}
           style = {{
             visibility: displayDeleteBtn ? "visible": "hidden"
           }}>
            ❌ delete task
          </DeleteBtn>
          
          )}
          
        </Droppable>

      </DragDropContext>
    </Container>
  );
};

export default Board;

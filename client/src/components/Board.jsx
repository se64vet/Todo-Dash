import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  padding: 1.5em;
`;
const Title = styled.h1`
  padding: 1rem;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`;
const Board = () => {
  //states
  const initialState = { "tasks": {}, "column": {}, "columnOrder": [] };
  const [board, setBoard] = useState(initialState);

  //component life-cycle
  useEffect(() => {
    fetchBoard().then((data) => setBoard(data));
  }, []);

  //functions
  const fetchBoard = async () => {
    try {
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      return data.board;
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

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
      <Title>Hydro board</Title>
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
    </Container>
  );
};

export default Board;

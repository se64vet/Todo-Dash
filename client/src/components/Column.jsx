import React, { useState } from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import Task from "./Task";

//styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border: 2px solid ${props => props.theme.primaryText};
  border-radius: 10px;
  margin: 1em;
  padding: 0.5em;
  min-height: 20em;
  width: 15em;
  overflow: hidden;
`;
const Title = styled.h3`
  font-weight: bold;
  padding: 0.25em;
`;
const TaskList = styled.div`
  padding: 0.25em;
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
`;
const NewTask = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const NewTaskBtn = styled.div`
  width: fit-content;
  aspect-ratio: 1/1;
  padding: 0.125em;
  text-align: center;
  font-weight: bold;
  align-self: end;
  cursor: pointer;
`;

const NewTaskInput = styled.input`
  height: 100%;
  padding: 0.3em 0;
  flex: 1;
`;

const Column = (props) => {
  const initialTask = {
    "id": "",
    "content": "",
  };
  const [newTask, setNewTask] = useState(initialTask);
  const [addTask, setAddTask] = useState(false);

  // check todo Column to render add button
  function isTodoColumn() {
    return props.column.title.toLowerCase() === "to do";
  }

  // toggle render add button
  function toggleAddTask() {
    setNewTask(initialTask);
    setAddTask(!addTask);
  }

  // handle input new Task
  function handleOnchange(e) {
    const rand = Math.floor(Math.random() * 9999);
    const content = e.target.value;
    const newId = "task-" + rand + content;

    setNewTask({ id: newId, content });
  }

  // add new Task on key press
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addNewTask();
    }
    if (e.key === "Escape") {
      toggleAddTask();
    }
  }

  // handle add new task
  function addNewTask() {
    const toastProps = {
      theme: "colored",
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    };
    //handle empty input
    if (newTask.content === "") {
      toast.error("Make sure you fill out input box!", toastProps);
      return;
    }
    //handle empty id
    if (newTask.id === "") {
      toast.error("Internal error!", toastProps);
      return;
    }
    // if there is no err
    props.addNewTask(newTask, props.column.id);
    toast.success("Added!", { ...toastProps, autoClose: 1000 });
    setNewTask(initialTask);
  }
  return (
    //draging column
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>

          {/* droppable columns */}
          <Droppable droppableId={props.column.id} type="task">
            {(provided) => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                {props.column.tasksIds.map((taskId, idx) => (
                  <Task key={taskId} item={props.tasks[taskId]} index={idx} colId={props.column.id}/>
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>

          <NewTask>
            {isTodoColumn() && addTask && (
              <>
                <NewTaskInput
                  autoFocus
                  value={newTask.content}
                  onChange={(e) => {
                    handleOnchange(e);
                  }}
                  onKeyDown={handleKeyDown}
                />

                <NewTaskBtn onClick={toggleAddTask}>❌</NewTaskBtn>
                <NewTaskBtn onClick={addNewTask}>✔️</NewTaskBtn>
              </>
            )}
            {!addTask && isTodoColumn() && (
              <>
                <div style={{ "flex": "1" }} />
                <NewTaskBtn onClick={toggleAddTask}>➕</NewTaskBtn>
              </>
            )}
          </NewTask>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;

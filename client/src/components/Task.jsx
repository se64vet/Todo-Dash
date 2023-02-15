import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";


const Task = (props) => {
  const [containerBg, setContainerBg] = useState("grey");
  const changeBgColor = (id)=>{
    id === "column-1" 
    ? setContainerBg("#FA8072")  
    : id === "column-2" 
      ? setContainerBg("#FFE69A")   
      : setContainerBg("#C4EB89")
  }
  useEffect(()=>{
    const {colId} = props;
    changeBgColor(colId);
  },[props])

  const Container = styled.div`
  text-align: center;
  padding: 1em 3em;
  background: ${containerBg}; 
  border-radius: 10px;
  margin: 5px 0;
  color: #444;
  font-weight: bold;
  `;

  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span> {props.item.content}</span>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;

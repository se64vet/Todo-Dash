import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
const Container = styled.div`
  text-align: center;
  padding: 1em 3em;
  background: lightgrey;
  margin: 5px 0;
`;
const Task = (props) => {
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

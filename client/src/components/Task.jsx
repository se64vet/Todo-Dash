import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
const Container = styled.div`
  text-align: center;
  padding: 1em 3em;
  background: ${props => props.theme.secondary}; 
  border-radius: 10px;
  margin: 5px 0;
  color: ${props => props.theme.primary};
  font-weight: bold;
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

import Board from "./components/Board";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 80rem;
  justify-content: center;
  align-items: center;
`;
function App() {
  return (
    <Container>
      <Board />
      <ToastContainer />
    </Container>
  );
}

export default App;

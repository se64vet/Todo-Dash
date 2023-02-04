import Board from "./components/Board";
import styled, {ThemeProvider} from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.secondaryText};
`;

const Button = styled.button`
  margin: 1em 0;
  padding: .5em;
  border: 1px solid ${(props) => props.theme.primaryText};
  border-radius: 10px;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primaryText};
  font-weight: bold;
  cursor: pointer;

  @media only screen and (max-width: 768px){
    align-self: flex-end;
    margin-right: 2em;
  }
`

const theme = {
  dark: {
    primary: "#323232",
    secondary: "#EEE",
    primaryText: "#EEE",
    secondaryText: "#EEE"
  },
  light: {
    primary: "#FFFFFF",
    secondary: "#787878",
    primaryText: "#787878",
    secondaryText: "#565656"
  },
}
function App() {
  const[darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
    <Container>
      <Button onClick={() => setDarkMode(!darkMode)}> {darkMode ? "Dark mode: 🌙" : "Light mode: 💡"}  </Button> 
      <Board />
      <ToastContainer />
    </Container>
    </ThemeProvider>
  );
}

export default App;

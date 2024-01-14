import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/router/router";
import { MisdemeanoursProvider } from "./hooks/misdemeanour_context/misdemeanour_context";

function App() {
  return (
    <>
      <BrowserRouter>
        <MisdemeanoursProvider>
          <Router />
        </MisdemeanoursProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

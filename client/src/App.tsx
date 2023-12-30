import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;

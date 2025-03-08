import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MainContextProvider } from "./Context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./Context/store.js";

import "./sass/global.scss";
import App from "./App.jsx";
import AuthInit from "./providers/AuthInit/AuthInit.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <AuthInit>
      <App />
    </AuthInit>
  </Provider>
  // </StrictMode>
);

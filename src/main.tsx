import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Toastify } from "./components";
import App from "./App.tsx";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toastify />
      <App />
    </Provider>
  </StrictMode>
);

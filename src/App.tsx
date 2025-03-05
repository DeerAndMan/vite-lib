import { Suspense } from "react";
import { Spin } from "antd";

import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Router } from "@router/main";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

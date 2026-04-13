import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "../features/auth/auth.routes";
const App = () => {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;

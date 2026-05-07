import React, { useEffect } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "../features/auth/auth.routes";
import { useAuth } from "../features/auth/hook/useAuth.hook";

const AppInner = () => {
  const { initAuth } = useAuth();

  useEffect(() => {
    initAuth();
  }, []);

  return <RouterProvider router={routes} />;
};

const App = () => {
  return (
    <div>
      <AppInner />
    </div>
  );
};

export default App;

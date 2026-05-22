import React, { useEffect } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { routes } from "./app.routes";
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
      {/* Global toasts — call from anywhere: import { toast } from "sonner" */}
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "#161618",
            border: "1px solid #282828",
            color: "#FFFFFF",
            fontFamily: "'DM Sans', system-ui, sans-serif",
          },
        }}
      />
    </div>
  );
};

export default App;

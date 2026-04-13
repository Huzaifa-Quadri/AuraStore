import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/Signup";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Welcome to our SNITCH APP</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

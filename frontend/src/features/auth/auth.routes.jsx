import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import SelectRole from "./pages/SelectRole";

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
  {
    path: "/select-role",
    element: <SelectRole />,
  },
]);

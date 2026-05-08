import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/login";
import Signup from "../features/auth/pages/Signup";
import SelectRole from "../features/auth/pages/SelectRole";
import AddProduct from "../features/product/pages/addProduct";
import Protected from "../features/auth/pages/protected";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: ( 
      <Protected>
        <h1>Welcome to our AuraStore APP</h1>
      </Protected>
    )
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
  {
    path: "/create-product",
    element: <AddProduct/>
  }
]);

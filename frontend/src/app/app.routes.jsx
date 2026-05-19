import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/login";
import Signup from "../features/auth/pages/Signup";
import SelectRole from "../features/auth/pages/SelectRole";
import AddProduct from "../features/product/pages/addProduct";
import Protected from "../features/auth/pages/protected";
import SellerDashboard from "../features/product/pages/SellerDashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected role="buyer">
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
    element: (
      <Protected>
        <SelectRole />
      </Protected>
    ),
  },
  {
    path: "/seller/dashboard",
    element: (
      <Protected role="seller">
        <SellerDashboard />
      </Protected>
    ),
  },
  {
    path: "/create-product",
    element: (
      <Protected role="seller">
        <AddProduct />
      </Protected>
    ),
  }
]);

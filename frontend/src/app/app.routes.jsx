import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/login";
import Signup from "../features/auth/pages/Signup";
import SelectRole from "../features/auth/pages/SelectRole";
import Protected from "../features/auth/pages/protected";
import SellerDashboard from "../features/product/Seller/pages/SellerDashboard";
import AddProduct from "../features/product/Seller/pages/addProduct";
import Home from "../features/product/Buyer/pages/Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
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

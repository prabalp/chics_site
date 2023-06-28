import React from "react";
import ReactDOM from "react-dom";

// import App from "./App";
import Product, { productLoader } from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { UserAuthContextProvider } from "./context/UserAuthContext";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  //   // add a error page too
  // },
  {
    // path: "/product/:productId",
    path: "/product/:id",
    element: <Product />,
    loader: productLoader,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     {/* <Provider store={store}> */}
//     <RouterProvider router={router} />
//     {/* </Provider> */}
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
    {/* <UserAuthContextProvider> */}
    <RouterProvider router={router} />
    {/* </UserAuthContextProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

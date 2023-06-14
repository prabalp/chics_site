import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  //   // add a error page too
  // },
  {
    // path: "/product/:productId",
    path: "/product",
    element: <Product />,
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
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);

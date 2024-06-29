import React from "react";
import { lazy } from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
// import { ThemeProvider } from "@material-tailwind/react";
import "../font-6/css/all.css";
import "../font-6/css/sharp-light.css";
import "../font-6/css/sharp-regular.css";
import "../font-6/css/sharp-solid.css";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";
// import store from "./redux/store.js";


// import './helper.scss'


// Components routes
const Loader = lazy(() => import("./Components/Loader/Loader.jsx"));
const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./Pages/Home.jsx"));
const Story = lazy(() => import("./Pages/Story.jsx"));
const Product = lazy(() => import("./Pages/Product.jsx"));
const Contact = lazy(() => import("./Pages/Contact.jsx"));
const Order = lazy(() => import("./Pages/Order.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Cart = lazy(() => import("./Pages/Cart.jsx"));
const Profile = lazy(() => import("./Components/Profile/Profile.jsx"));
const ProductDetail = lazy(() => import("./Components/ProductDetail/ProductDetail.jsx"));
const Buttons = lazy(() => import("./Components/Buttons.jsx"));




const isAuthenticated = () => {
  // Retrieve the auth token from local storage or cookies
  const authToken = localStorage.getItem('accessToken');
  // Check if the token is present and valid
  return authToken && isValidToken(authToken); // Replace isValidToken with your token validation logic
};

// Function to validate the token (you'll need to implement the actual validation)
const isValidToken = (token) => {
  // Placeholder for token validation logic
  // You should replace this with actual validation, which may include checking the token's expiration, signature, etc.
  return true; // Assuming the token is valid for demonstration purposes
};

// Higher-Order Component for protected routes
const AuthMiddleware = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;

};
// Higher-Order Component for protected routes
const ProtectedRouteLogin = ({ children }) => {
  if (isAuthenticated()) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/profile" replace />;
  }
  return children;

};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback={<Loader />}>
            <Home />
          </React.Suspense>
        ),
      },
      {
        path: "story",
        element: (
          <React.Suspense fallback={<Loader />}>
            <Story />
          </React.Suspense>
        ),
      },

      {
        path: "product",
        element: (
          <React.Suspense fallback={<Loader />}>
            <Product />
          </React.Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <React.Suspense fallback={<Loader />}>
            <Contact />
          </React.Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRouteLogin>
              <Login />
            </ProtectedRouteLogin>
          </React.Suspense>
        ),
      },
      {
        path: "product/:productId",
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProductDetail />
          </React.Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <React.Suspense fallback={<Loader />}>
            <AuthMiddleware>
              <Cart />
            </AuthMiddleware>
          </React.Suspense>
        ),
      },
      {
        path: "order",
        element: (
          <React.Suspense fallback={<Loader />}>
            <AuthMiddleware>
              <Order />
            </AuthMiddleware>
          </React.Suspense>
        ),
      },
      {
        path: "test",
        element: (
          <React.Suspense fallback={<Loader />}>
            <Buttons />
          </React.Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <React.Suspense fallback={<Loader />}>
            <AuthMiddleware>
              <Profile />
            </AuthMiddleware>
          </React.Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ReduxProvider store={store}> */}
    <RouterProvider router={router} />

    {/* </ReduxProvider> */}
  </React.StrictMode>
);

// for testing loader

// const Home = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import("./Components/Home")), 3000); // Set timeout to 3000ms (3 seconds)
//   });
// });

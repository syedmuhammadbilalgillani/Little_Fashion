import React, { lazy, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider } from "@material-tailwind/react";
import { CartProvider } from "./context/cartContext";

const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const Fotter = lazy(() => import("./Components/Fotter/Fotter"));
const Loader = lazy(() => import("./Components/Loader/Loader"));

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  const location = useLocation();


  const pathsToHideNavbar = []; // Add your specific paths here
  const pathsToHideFooter = ["/login", "/profile", "/cart", "/order"]; // Add your specific paths here


  const hideNavbar = pathsToHideNavbar.includes(location.pathname);
  const hideFooter = pathsToHideFooter.includes(location.pathname);

  return (
    <>
      <ThemeProvider>
        <CartProvider>
          <Suspense fallback={<Loader />}>
            {!hideNavbar && <Navbar />}
            <div className="dark:bg-gray-700 bg-[--white]">
              <Outlet />
            </div>
            {!hideFooter && <Fotter />}
          </Suspense>
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

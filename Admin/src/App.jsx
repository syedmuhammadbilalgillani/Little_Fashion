import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const { isActive } = useTheme();
  return (
    <>



      <div className="">
        <Sidebar></Sidebar>
        <div className={` ${isActive ? "ml-48" : "ml-20"} p-3 transition-all`}>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default App;

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import "./index.scss";
import MobileWarning from "../MobileWarning";

const BoidsLayout = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [userHasBeenWarned, setUserHasBeenWarned] = useState(false);
  const isMobile = width <= 1089;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  return (
    <div className="App">
      <Sidebar />
      {isMobile && !userHasBeenWarned ? (
        <MobileWarning setUserHasBeenWarned={setUserHasBeenWarned} />
      ) : (
        <div className="page">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default BoidsLayout;

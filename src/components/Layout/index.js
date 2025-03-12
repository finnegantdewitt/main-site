import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import MobileWarning from "../MobileWarning";
import "./index.scss";

const Layout = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [userHasBeenWarned, setUserHasBeenWarned] = useState(false);
  const isMobile = width <= 500;

  function handleWindowSizeChange() {
    console.log(window.innerWidth);
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
          <span className="tags top-tags">&lt;body&gt;</span>

          <Outlet />

          <span className="tags bottom-tags">
            &lt;/body&gt;
            <br />
            <span className="bottom-tag-html">&lt;/html&gt;</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Layout;

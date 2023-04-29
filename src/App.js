import React, { useEffect } from "react";
import Routes from "./routes/index";
import { useLocation } from "react-router-dom";

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Routes />;
};

export default App;

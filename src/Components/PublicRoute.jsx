import React, { useEffect, useState } from "react";
import UserNavBar from "./usersComponents/Navbar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function PublicRoute({
  isAuthenticated: isAuthenticated,
  component: component,
  ...rest
}) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  useEffect(() => {
    setAuthenticated(localStorage.getItem("auth"));
  }, [localStorage.getItem("auth")]);
  return (
    <>
      <UserNavBar isAuthenticated={authenticated} />
      <Route {...rest} component={component} />
    </>
  );
}

export default PublicRoute;

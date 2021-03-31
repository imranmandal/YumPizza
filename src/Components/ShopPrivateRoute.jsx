import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function ShopPrivateRoute({
  isAuthenticated: isAuthenticated,
  component: component,
  ...rest
}) {
  if (isAuthenticated === "true") {
    return <Route {...rest} component={component} />;
  }

  return <Redirect to="/login" />;
}

export default ShopPrivateRoute;

import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import ShopNavbar from "./shopComponents/Navbar";
import UserNavBar from "./usersComponents/Navbar";

function PrivateRoute({
  isAuthenticated: isAuthenticated,
  component: component,
  userType: userType,
  ...rest
}) {
  if (isAuthenticated === "true") {
    return (
      <>
        {userType === "shop" && <ShopNavbar />}
        {userType === "customer" && (
          <UserNavBar isAuthenticated={isAuthenticated} />
        )}
        <Route {...rest} component={component} />
      </>
    );
  }

  return <Redirect to="/login" />;
}

export default PrivateRoute;

import React, { createContext, useEffect, useReducer, useState } from "react";
import Home from "./Components/usersComponents/HomeComponent/Home";
import About from "./Components/About";
import Cart from "./Components/usersComponents/Cart";
import Account from "./Components/usersComponents/Account";
import UserNavbar from "./Components/usersComponents/Navbar";
import ShopNavbar from "./Components/shopComponents/Navbar";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
// import ShopRegister from "./Components/shopComponents/Authentication/ShopRegister";
// import Test from "./Components/testfolder/test";
import Dashboard from "./Components/shopComponents/sub-routes/DashboardComponent/Dashboard";
import Setting from "./Components/shopComponents/sub-routes/SettingComponent/Setting";
import Items from "./Components/shopComponents/sub-routes/ItemComponent/Items";
import Orders from "./Components/shopComponents/sub-routes/OrderComponent/Order";
import OrderError from "./Components/shopComponents/sub-routes/OrderErrorComponent/OrderError";
import Report from "./Components/shopComponents/sub-routes/ReportComponent/Report";
// import NotFound from "./NotFound";
import { AuthContext, reducer, cartReducer } from "./auth.context/authContext";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Image from "./image";
import Payment from "./Components/usersComponents/HomeComponent/payment";
import CreateShop from "./Components/CreateShopComponents/CreateShop";
import PrivateRoute from "./Components/PrivateRoute";
import ShopPrivateRoute from "./Components/ShopPrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import { ToastContainer } from "react-toastify";

const userId = localStorage.getItem("id");

const initialvalue = localStorage.getItem("auth");
const cartCountInitialValue =
  JSON.parse(localStorage.getItem(`cartOf${userId}`)) === null
    ? 0
    : JSON.parse(localStorage.getItem(`cartOf${userId}`)).length;
// -------------------------------------- App Start

function App() {
  useEffect(() => {
    localStorage.getItem("auth") === null &&
      localStorage.setItem("auth", false);
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth")
  );
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("auth"));
  }, [localStorage.getItem("auth")]);

  const userType = localStorage.getItem("userType");

  const [state, dispatch] = useReducer(reducer, initialvalue);
  const [cartCount, cartCountDispatch] = useReducer(
    cartReducer,
    cartCountInitialValue
  );

  return (
    <>
      <AuthContext.Provider
        value={{
          authState: state,
          authDispatch: dispatch,
          cartCountState: cartCount,
          cartCountDispatch: cartCountDispatch,
        }}
      >
        <div className="App">
          <Router>
            {/* {userType === "customer" && <UserNavbar />}
            {userType === "shop" && <ShopNavbar />} */}
            {/* {userType && <UserNavbar />} */}
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              {/* <UserNavbar> */}

              <PublicRoute
                isAuthenticated={isAuthenticated}
                path="/"
                exact
                component={Home}
              />
              <PublicRoute
                isAuthenticated={isAuthenticated}
                path="/about"
                component={About}
              />
              <PublicRoute
                isAuthenticated={isAuthenticated}
                path="/cart"
                component={Cart}
              />

              <PrivateRoute
                userType={userType}
                path="/account"
                component={Account}
                isAuthenticated={isAuthenticated}
              />

              {/* <PrivateRoute
                isAuthenticated={isAuthenticated}
                userType={userType}
                path="/shop"
                component={ShopRegister}
              /> */}
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/payment"
                userType={userType}
                component={Payment}
              />
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/create-shop"
                userType={userType}
                component={CreateShop}
              />
              {/* </UserNavbar> */}

              {/* <ShopNavbar /> */}
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/dashboard"
                userType={userType}
                component={Dashboard}
              />
              {/* <PrivateRoute isAuthenticated={isAuthenticated}userType={userType} path="/shop" component={ShopRegister} /> */}
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/setting"
                userType={userType}
                component={Setting}
              />
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/items"
                userType={userType}
                component={Items}
              />
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/test"
                userType={userType}
                component={Image}
              />
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/orders"
                userType={userType}
                component={Orders}
              />
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/order_errors"
                userType={userType}
                component={OrderError}
              />
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/reports"
                userType={userType}
                component={Report}
              />
              {/* </ShopNavbar> */}

              {/* <Route path="/test" component={Test} /> */}
            </Switch>
          </Router>
        </div>
        <ToastContainer />
      </AuthContext.Provider>
    </>
  );
}

export default App;

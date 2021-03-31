import React, { createContext, useEffect, useReducer, useState } from "react";
import Home from "./Components/usersComponents/HomeComponent/Home";
import About from "./Components/About";
import Cart from "./Components/usersComponents/Cart";
import Account from "./Components/usersComponents/Account";
import UserNavbar from "./Components/usersComponents/Navbar";
import ShopNavbar from "./Components/shopComponents/Navbar";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import ShopRegister from "./Components/shopComponents/Authentication/ShopRegister";
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

const userId = localStorage.getItem("id");

const initialvalue = localStorage.getItem("auth");
const cartCountInitialValue =
  JSON.parse(localStorage.getItem(`cartOf${userId}`)) === null
    ? 0
    : JSON.parse(localStorage.getItem(`cartOf${userId}`)).length;
// -------------------------------------- App Start

function App() {
  useEffect(() => {
    localStorage.getItem("auth") == null && localStorage.setItem("auth", false);
  }, []);
  
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
            <Switch>
              {localStorage.getItem("auth") == "false" ? (
                <>
                  <Route path="/">
                    {localStorage.getItem("auth") == "false" ? (
                      <Redirect to="/register" />
                    ) : (
                      localStorage.getItem("auth") == "true" && (
                        <Redirect to="/" />
                      )
                    )}
                  </Route>
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                </>
              ) : localStorage.getItem("auth") == "true" &&
                localStorage.getItem("userType") === "customer" ? (
                <>
                  <Route exact path={"/register" || "/login"}>
                    <Redirect to="/" />
                  </Route>
                  <UserNavbar />
                  <Route path="/" exact component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/account" component={Account} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/shop" component={ShopRegister} />
                  <Route path="/payment" component={Payment} />
                  <Route path="/create-shop" component={CreateShop} />
                  {/* <Route path="/test" component={Test} /> */}
                </>
              ) : (
                localStorage.getItem("auth") == "true" &&
                localStorage.getItem("userType") === "shop" && (
                  <>
                    <div className="">
                      <ShopNavbar />
                      <div>
                        <Route exact path="/">
                          <Redirect to="/dashboard" />
                        </Route>

                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/shop" component={ShopRegister} />
                        <Route path="/setting" component={Setting} />
                        <Route path="/items" component={Items} />
                        <Route path="/test" component={Image} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/order_errors" component={OrderError} />
                        <Route path="/reports" component={Report} />
                      </div>
                    </div>
                  </>
                )
              )}
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;

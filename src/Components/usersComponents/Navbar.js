import React, { useContext, useEffect, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth.context/authContext";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";

function Navbar({ children, isAuthenticated: isAuthenticated }) {
  const auth = localStorage.getItem("auth");
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const cartContext = useContext(AuthContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setAuthenticated(localStorage.getItem("auth"));
  });

  return (
    <>
      <nav className="nav-container">
        <div className="navbar">
          <div className="justify-content-around text-center text-light">
            <img
              className="logo"
              src="https://pngimg.com/uploads/pizza/pizza_PNG44094.png"
              alt="logo"
            ></img>
            <p className="text-capitalize">yum pizza</p>
          </div>

          <ul>
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <div className="position-relative justify-content-between">
            <Link
              className="userIcon mr-3"
              to={authenticated === "true" ? "/account" : "/login"}
            >
              {authenticated === "true" ? (
                <AccountCircleTwoToneIcon fontSize="large" />
              ) : authenticated === "false" && (
                <button className="btn btn-primary">Login</button>
              )}
            </Link>


            <Link to="/cart">
              <button className="orderBtn">
                <p className="cart_count position-absolute text-light ml-4 bg-success">
                  {cartContext.cartCountState}
                </p>
                <ShoppingCartIcon />
              </button>
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}

export default Navbar;

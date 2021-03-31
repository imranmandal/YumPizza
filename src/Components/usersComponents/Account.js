import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import { motion } from "framer-motion";
import { AuthContext } from "../../auth.context/authContext";
import Cart from "./Cart";
import Transactions from "./Transactions";
import Orders from "./Orders";

function Account() {
  const [content, setContent] = useState("Cart");
  const [showSetting, setShowSetting] = useState(false);

  const auth = useContext(AuthContext);

  function handleClick(event) {
    setContent(event.target.innerHTML);

    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    event.target.className += "active";
  }

  const logout = (e) => {
    auth.authDispatch({ type: "logout" });
  };

  const toggleSetting = () => {
    setShowSetting((prevValue) => !prevValue);
  };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100px" },
  };
  
  return (
    <>
      <motion.div
        className="position-absolute p-3 mt-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span
          onClick={toggleSetting}
          className="p-2"
          role="button"
          data-bs-toggle="tooltip"
          tool
          data-bs-placement="top"
          title="Settings"
        >
          <SettingsTwoToneIcon fontSize="large" />
        </span>
      </motion.div>

      <motion.div
        animate={showSetting ? "open" : "closed"}
        variants={variants}
        exit={{ opacity: 0 }}
      >
        <ul className="position-absolute mt-5  p-5 bg-light border shadow text-capitalize">
          <li>change username</li>
          <li>Change password</li>
          <Link to="/create-shop" className="text-dark text-decoration-none">
            <motion.li whileHover={{ scale: 1.02 }}>Create Shop</motion.li>
          </Link>
        </ul>
      </motion.div>

      <div className="container">
        <h1>Hello {localStorage.getItem("name")}. </h1>

        <p>( {localStorage.getItem("userType")} )</p>
        <div className="account-info">
          <div className="info">
            <div>
              <p>
                Address :
                <span>
                  Room no. 405, Seet kunj , Postal colony, Chembur, Mumbai,
                  400071.
                </span>
              </p>
              <p>
                Phone no. : <span>+91 7039000000</span>
              </p>
            </div>
            <img
            className="shadow-lg"
              src="https://api.multiavatar.com/Starcrashe.png"
              alt="profile"
            />
            <button className="btn btn-secondary" onClick={logout}>
              <Link className="text-light text-decoration-none" to="/login">
                Log-out
              </Link>
            </button>
          </div>
          <div className="account-activity">
            <ul>
              <li className="active" onClick={handleClick}>
                Cart
              </li>
              <li className="" onClick={handleClick}>
                Orders
              </li>
              <li className="" onClick={handleClick}>
                On Delivery
              </li>
              <li className="" onClick={handleClick}>
                Transactions
              </li>
            </ul>
            <div className="acc">
              {content === "Cart" ? (
                <Cart />
              ) : content === "Orders" ? (
                <div>
                  <Orders />
                </div>
              ) : content === "On Delivery" ? (
                <div>
                  <h1>On Delivery Heading</h1>
                </div>
              ) : (
                content === "Transactions" && (
                  <div>
                    <Transactions />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;

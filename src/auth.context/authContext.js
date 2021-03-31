import React, { createContext } from "react";
import { LoginUser, RegisterUser, LogoutUser } from "./Functions/Function";
// State

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      LoginUser();
      return;
    case "register":
      RegisterUser();
      return;
    case "logout":
      LogoutUser();
      return;
    default:
      return;
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "remove":
      return state - 1;
    default:
      return;
  }
};

// Create Context
const AuthContext = createContext();

// Export
export { AuthContext, reducer, cartReducer };

import axio from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../auth.context/authContext";

function Login(props) {
  const auth = useContext(AuthContext);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const axios = axio.create({
    withCredentials: true,
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_SERVER_URL}login`, data).then(
      (res) => {
        if (res.status === 200) {
          toast.success("Success.");
        }
        console.log(res.status);
        auth.authDispatch({ type: "login" });

        if (res.data.userType === "shop") {
          toast.success("Success.");
          history.push("/dashboard");
        }
        if (res.data.userType === "customer") {
          history.push("/");
        }
      },
      (err) => toast.warning("Please enter correct Username and password.")
    );
  };

  const getUser = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}user`).then((res) => {
      return res.data;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div className="container text-center">
      <img
        style={{
          position: "absolute",
          height: "450px",
          right: "-80px",
          top: "0px",
          zIndex: "-1",
        }}
        src="./images/klipartz.com.png"
        alt="User Img"
      />
      <div className="bg-light shadow rounded container col-5 p-5">
        <h1>Login</h1>
        <form>
          <div className="py-2">
            <input
              onChange={handleChange}
              name="username"
              value={data.username}
              type="text"
              className="form-control my-3 mx-auto text-center col-12"
              placeholder="Username"
            />
            <input
              onChange={handleChange}
              name="password"
              value={data.pass}
              type="password"
              className="form-control my-3 mx-auto text-center col-12"
              placeholder="Password"
            />
          </div>

          <button onClick={loginUser} className="orderBtn px-auto w-100 my-2">
            Login
          </button>
        </form>
        <span className="text-secondary">
          Dont have an account?
          <Link className="text-primary text-decoration-none" to="/register">
            Register
          </Link>
        </span>
      </div>

      {/* <button onClick={getUser} className="orderBtn col-md-5">
        Get User
      </button> */}
    </div>
  );
}

export default Login;

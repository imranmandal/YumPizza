import axio from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../auth.context/authContext";

function Register(props) {
  const auth = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    userType: "customer",
  });

  const axios = axio.create({
    withCredentials: true,
  });
  
  const registerUser = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}register`, user)
      .then((res, err) => {
        console.log(typeof res.status);

        if (res.status === 200) {
          return toast.success(res.data);
        }
        auth.authDispatch({ type: "register" });
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 404) {
          return toast.error(err.response.data);
        }
      });
  };

  const getUser = () => {
    axios.get(`http://localhost:4000/user`).then((res) => {
      console.log(res.data);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevValue) => ({ ...prevValue, [name]: value }));
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
      <div className="bg-light shadow rounded container col-6 p-5">
        <h1>Register</h1>
        <div className="py-2">
          <input
            type="email"
            name="email"
            className="form-control my-3 mx-auto text-center col-12"
            onChange={handleChange}
            placeholder="Email"
            value={user.email}
          />
          <input
            type="text"
            name="username"
            className="form-control my-3 mx-auto text-center col-12"
            onChange={handleChange}
            placeholder="Username"
            value={user.username}
          />
          <input
            type="password"
            name="password"
            className="form-control my-3 mx-auto text-center col-12"
            onChange={handleChange}
            placeholder="Password"
            value={user.pass}
          />
        </div>
        <button
          onClick={registerUser}
          className="orderBtn border-bottom px-auto w-100 my-2"
        >
          Register
        </button>
        <span className="text-secondary">
          Already have an account?
          <Link className="text-primary text-decoration-none" to="/login">
            Login
          </Link>
        </span>
        {/* <button onClick={getUser} className="orderBtn col-md-12">
          Get User
        </button> */}
      </div>
    </div>
  );
}

export default Register;

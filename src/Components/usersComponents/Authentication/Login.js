import axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Login(){

  const [cred, setCred] = useState({
    username: "",
    pass: ""
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/login', cred)
    .then(res => {console.log(res)});
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCred(prevValue=> ({...prevValue, [name]: value}));
  };


    return(
        
    <div className="form-container">
        <img
          style={{ position: "absolute" ,height: "450px" ,right:'-80px' ,top:"0px", zIndex: "-1" }}
          src="./images/klipartz.com.png"
          alt="User Img"
        />
        <div className="form">
        <h1>Login</h1>
        <form className="column g-3">
            <div className="row-md-6">
                <input onChange={handleChange} name="username" value={cred.username} type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="row-md-6">
                <input onChange={handleChange} name="pass" value={cred.pass} type="password" className="form-control" placeholder="Password" />
            </div>
            <button onClick={loginUser} className="orderBtn">Login</button>
        </form>
        </div>
        <span>Dont have an account? <Link to="/register" >Register</Link></span>
    </div>
     
    )
}

export default Login;
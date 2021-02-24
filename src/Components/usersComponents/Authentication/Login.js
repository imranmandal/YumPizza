import React from 'react';
import {Link} from 'react-router-dom';

function Login(){
    return(
        
    <div className="form-container">
      <form>
        <img
          style={{position: "absolute" , height: "400px", left:"200px" }}
          src="./images/klipartz.com.png"
          alt="User Img"
        />
        <div className="form">
        <h1>Login</h1>
        <form class="column g-3">
            <div class="row-md-6">
                <input type="email" class="form-control" placeholder="Email" />
            </div>
            <div class="row-md-6">
                <input type="password" class="form-control" placeholder="Password" />
            </div>
            <button className="orderBtn">Login</button>
        </form>
        </div>
        <span>Dont have an account? <Link to="/register" >Register</Link></span>
      </form>
    </div>
     
    )
}

export default Login;
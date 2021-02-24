import React, { useState } from 'react';
import axios from 'axios';

function Test() {



    const [loginData, setLoginData] = useState({
        email: "",
        pass: ""
    });

    function handleChange(e) {
        const {type, value} = e.target;
        setLoginData((prevValue)=> type==="email" 
        ? {email: value, pass: prevValue.pass}
        : type==="password" && {email:prevValue.email, pass:value}
        )
    }

    function handleClick(e) {
        e.preventDefault();
        const value = e.target.value;
        axios.post(`http://localhost:4000/test`, loginData);
    }
 
    return(
        <div style={{padding: "200px"}}>
            <div className="row-md-6">
                <input onChange={handleChange} type="email" name="email" value={loginData.email} className="form-control" placeholder="Email" />
            </div>
            <div className="row-md-6">
                <input onChange={handleChange} type="password" value={loginData.pass} className="form-control" placeholder="Password" />
            </div>
            <button className="orderBtn" onClick={handleClick}>Login</button>
        </div>
            
    )
}


export default Test;
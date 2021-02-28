import axio from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Register(props){

    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        userType: "customer",
    });

    const axios = axio.create({
        withCredentials: true
    })

    const registerUser = () => {
        axios.post(`http://localhost:4000/register`, user)
        .then((res) => (console.log(res.data)));
    };

    const getUser = () => {
        axios.get(`http://localhost:4000/user`)
        .then((res) => {console.log(res.data)})
        .catch((error) => {console.log(error)})
    };

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser(prevValue => ({...prevValue, [name]: value}))
    };

    return(    
    <div className='form-container container'>
        <img

            style={{ position: "absolute" ,height: "450px" ,right:'-80px' ,top:"0px", zIndex: "-1" }}
            src="./images/klipartz.com.png"
            alt="User Img"
        /> 
        <div className="form">
            <h1>Register</h1>
            <form className="row g-3">
                <div className="col-md-12">
                    <input type="email" name="email" className="form-control" 
                     onChange={handleChange} placeholder="Email" value={user.email} />
                </div>
                <div className="col-md-12">
                    <input type="text" name="username" className="form-control" 
                     onChange={handleChange} placeholder="Username" value={user.username} />
                </div>
                <div className="col-md-12">
                    <input type="password" name="password" className="form-control" 
                     onChange={handleChange} placeholder="Password" value={user.pass} />
                </div>
            </form>
            <button onClick={registerUser} className='orderBtn'>Register</button><br/>
            <span className="col-md-12">Already have an account? <Link to="/login" >Login</Link></span>
            <button onClick={getUser} className='orderBtn col-md-12'>Get User</button><br/>
        </div>
    </div>  
     
    )
}

export default Register;
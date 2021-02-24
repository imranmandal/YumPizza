import axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Register(props){

    const [user, setUser] = useState({
        username: "",
        pass: "",
        type: "customer"
    });

    function setUserType(userType){
        props.setUser(userType)
    }

    function registerUser(){
        axios.post(`http://localhost:4000/register`, user)
        .then(res => setUserType(res.data.type));
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser(prevValue => ({...prevValue, [name]: value}))
    }

    return(    
    <div className='form-container container'>
        <img

            style={{ position: "absolute" ,height: "450px" ,right:'-80px' ,top:"0px" }}
            src="./images/klipartz.com.png"
            alt="User Img"
        /> 
        <div className="form">
            <h1>Register</h1>
            <form className="row g-3">
                {/* <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="First Name" />
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Last Name" />
                </div> */}
                <div className="col-md-6">
                    <input type="email" name="username" className="form-control" 
                     onChange={handleChange} placeholder="Email" value={user.username} />
                </div>
                <div className="col-md-6">
                    <input type="password" name="pass" className="form-control" 
                     onChange={handleChange} placeholder="Password" value={user.pass} />
                </div>
                {/* <div class="col-12">
                    <input type="text" class="form-control" placeholder="1234 Main St" />
                </div>
                <div class="col-12">
                    <input type="text" class="form-control" placeholder="Apartment, studio, or floor" />
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="City" />
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="State" />
                    
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" placeholder="Zip" />
                </div> */}
                
                
            </form>
            <button onClick={registerUser} className='orderBtn'>Register</button><br/>
            <span>Already have an account? <Link to="/login" >Login</Link></span>
        </div>
    </div>  
     
    )
}

export default Register;
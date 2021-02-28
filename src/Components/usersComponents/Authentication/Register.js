import axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Register(props){

    const [user, setUser] = useState({
        username: "",
        password: "",
        userType: "customer",
    });

    const [data, setData] = useState(null);
    // function setUserType(userType){
    //     props.setUser(userType)
    // }

    const registerUser = () => {
        // console.log(user);
        axios.post(`http://localhost:4000/register`, user)
        .then((res) => (console.log(res.data)));
        
        
    };

    const getUser = () => {
        axios.get(`http://localhost:4000/user`)
        .then(res => (console.log(res)));
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
                    <input type="password" name="password" className="form-control" 
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
            <button onClick={getUser} className='orderBtn'>Get User</button><br/>
        </div>
    </div>  
     
    )
}

export default Register;
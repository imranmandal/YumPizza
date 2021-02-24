import React from 'react';
import {Link} from 'react-router-dom';

function ShopRegister(){
    return(    
    <div className='form-container container'>
       
        <div className="form">
            <h1>Register your shop ...</h1>
            <form class="row g-3">
                <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Owner Name" />
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Shop name" />
                </div>
                <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="GST Number" />
                </div>
                <div class="col-md-12">
                    <input type="email" class="form-control" placeholder="Email" />
                </div>
                <div class="col-md-6">
                    <input type="password" class="form-control" placeholder="Password" />
                </div>
                <div class="col-md-6">
                    <input type="password" class="form-control" placeholder="Confirm Password" />
                </div>
                <div class="col-12">
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
                </div>
                
                
            </form>
            <button className='orderBtn'>Register</button><br/>
            <span>Already have an account? <Link to="/login" >Login</Link></span>
        </div>
    </div>  
     
    )
}

export default ShopRegister;
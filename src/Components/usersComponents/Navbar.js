import React from 'react';






import {Link} from 'react-router-dom';



function Navbar(){
    return <nav className="nav-container">
        <div className='navbar'>
            <img className="logo" src="https://pngimg.com/uploads/pizza/pizza_PNG44094.png" alt="logo"></img>
            <ul>
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/about">About</Link></li>
                <li><Link className="nav-link" to="/cart">Cart</Link></li>
                <li><Link className="nav-link" to="/account">Account</Link></li>
            </ul>
            <button className="orderBtn">Orders</button>
        </div>
    </nav>  
}

export default Navbar;
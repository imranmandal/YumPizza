import React, { useState } from 'react';
import Cart from "./Cart";


function Account(){
    
    const [content, setContent] =useState('Cart');

    function handleClick(event){
        setContent(event.target.innerHTML);
        
        const current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        event.target.className += "active";
    }

    
    return( <div className="account-container">

        <h1>Hello Imran.</h1>
        <div className="account-info">
            <div className="info">
                <div>
                    <p>Address : 
                    <span>
                    Room no. 405,
                    Seet kunj ,
                    Postal colony,
                    Chembur, Mumbai,
                    400071.
                    </span>
                    </p>
                    <p>Phone no. : <span>+91 7039000000</span></p>
                </div>
                <img src="./images/profile.jpg" alt="profile" />
            </div>
            <div className="account-activity">
                <ul>
                    <li className="active" onClick={handleClick}>Cart</li>
                    <li className="" onClick={handleClick}>Orders</li>
                    <li className="" onClick={handleClick}>On Delivery</li>
                    <li className="" onClick={handleClick}>Transactions</li>
                </ul>
                <div className="acc">
                
                    {
                        content === "Cart"?
                        (
                            <Cart />
                        )    : 

                        content ==="Orders"    ?        
                        (<div>
                            <h1>Orders Heading</h1>
                        </div>) :

                        content === "On Delivery" ?
                        (<div>
                            <h1>On Delivery Heading</h1>
                        </div>) :

                        content === "Transactions" &&
                        <div>
                            <h1>Transactions Heading</h1>
                        </div>
                    }
                
                </div>
            </div>
        </div>
    </div>)
}

export default Account;
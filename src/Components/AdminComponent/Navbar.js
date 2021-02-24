import React from 'react';
import Li from './sub-routes/Li';



function ShopNavbar() {

    function handleClick(d){
        var current = document.getElementsByClassName("lis active");
        current[0].className = current[0].className.replace(" active", "");
        d.target.parentElement.parentElement.className += " active";
    }

    return(
        <div>
        <nav className="dash-nav1">
            <img src="https://francospizza.com/wp-content/uploads/banner__pizza-1.png" alt="logo" />
				<ul>

                    <Li class="active" handleClick={handleClick} icon="dashboard" route="/" text="Dashboard"/>
                    <Li handleClick={handleClick} icon="settings" route="/setting" text="Settings" />
                    <Li handleClick={handleClick} icon="local_pizza" route="/items" text="Items" />
                    <Li handleClick={handleClick} icon="shopping_basket" route="/orders" text="Orders" />
                    <Li handleClick={handleClick} icon="running_with_errors" route="/order_errors" text="Order Errors" />
                    <Li handleClick={handleClick} icon="analytics" route="/reports" text="Reports" />	

                    {/* <Li route="" text="Masters" />
                    <Li route="" text="Users" />
                    <Li route="" text="Admins" />
                    <Li route="" text="Delivery Boy" /> */}
                </ul>
        </nav>     
        </div>
    )
}


export default ShopNavbar;
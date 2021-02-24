import React from 'react';
import Icon from '../../iconComponent/Icon';

function SubNav(props){

    const menu = props.menu;
     

    function handleClick(e) {
        props.handleClick(e);
    }
    return (
    <nav className="dash-nav2">
        <div className="dash-nav2-links">
            <ul>
                { 
                    menu.map((link, index)=>{
                            return (
                                <li onClick={handleClick} 
                                    className={index === 0 ? "sublis active" : "sublis"}
                                    key={index}>{link}
                                </li>)
                        }
                    )
                }
            </ul>

            <Icon name="account_circle" />
            
        </div>
    </nav>
)}

export default SubNav;
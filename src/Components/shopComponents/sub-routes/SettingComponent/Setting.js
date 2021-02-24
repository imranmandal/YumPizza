import React, { useState } from 'react';
import SubNav from '../SubNav';
import SocialMediaSetting from './SocialMediaSetting';
import EditShop from './EditShop';
import EditPersonal from './EditPersonal';
import EditCredential from './EditCredential';

function Setting(){

    const setting=[
        "Social Media",
        "Edit Shop",
        "Personal Details",
        "Credential Settings"
    ]

    const [navClicked, setNavClicked] = useState("Social Media");

    function handleClick(e) {
        setNavClicked(e.target.innerHTML);

        const current = document.getElementsByClassName("sublis active");
        current[0].className = current[0].className.replace("sublis active", "sublis");
        e.target.className += " active";
    }

    return (
    <div>
        <SubNav menu={setting} handleClick={handleClick} />
        <div className="setting-container">
            {
                navClicked === "Social Media" ?
                <SocialMediaSetting /> :
                navClicked === "Edit Shop" ?
                <EditShop /> :
                navClicked === "Personal Details" ? 
                <EditPersonal /> :
                navClicked === "Credential Settings" &&
                <EditCredential />
            }
        </div>
        
    </div>)
}

export default Setting;
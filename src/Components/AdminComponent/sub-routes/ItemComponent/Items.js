import React,{ useState } from 'react';
import SubNav from '../SubNav';
import Item from './Item';
import ComboItems from './ComboItems';

function Items(){

    const items=[
        "Items",
        "Combo Items"
    ]

    const [navClicked, setNavClicked] = useState("Items");

    function handleClick(e) {
        setNavClicked(e.target.innerHTML);

        const current = document.getElementsByClassName("sublis active");
        current[0].className = current[0].className.replace("sublis active", "sublis");
        e.target.className += " active";
    }

 
    return(
        <div>
            <SubNav menu={items} handleClick={handleClick} />
            <div className="items-container">
            {
                navClicked === "Items" ?
                <Item /> :
                navClicked === "Combo Items"    &&
                <ComboItems />              
            }
            </div>
        </div>
        
    )
}

export default Items;
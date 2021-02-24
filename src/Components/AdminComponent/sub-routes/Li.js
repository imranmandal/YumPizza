import React from 'react';
import Icon from '../../iconComponent/Icon';

import { Link } from "react-router-dom";





function Li(props){
    const route = props.route;
    function handleClick(d){
        props.handleClick(d);
    }
    

    return (
            <Link className="dash-nav1-links" to={route} >
                <div className={"lis "+ props.class} onClick={handleClick}>
                    <div className="lis ">
                        <li>
                            <Icon name={props.icon} />   
                            {props.text}
                        </li>
                    </div>
                    
                </div>
            </Link>
        
    )
}

export default Li;
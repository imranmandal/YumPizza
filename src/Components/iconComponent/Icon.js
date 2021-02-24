import React from 'react';


function Icon(props){
    return(
        <span className={props.class + ' material-icons'} id={props.id}>
            {props.name}
        </span>
    )
}

export default Icon;
import React, { useState } from 'react';





function ToggleStatusButton(props){
    
    const [status, setStatus] = useState(props.status);

    function handleClick(e) {
        setStatus((prevValue)=> prevValue==="active" ? "non-active" 
                    : prevValue==="non-active" && "active"
        );
        props.handleClick(e);
    }

    return(
        <label className="switch">
            <input type="checkbox" name={status} value={props.id} onClick={handleClick}
            defaultChecked={status === "active" ? true : false } disabled={props.disabled} />

            <span className="slider round"></span>
        </label>
    )
}

function ToggleTimedButton(props) {

    const [timed, setTimed] = useState(props.timed);

    function handleClick(e) {
        setTimed(!timed);
        props.handleClick(e);
    }

    return(
        <label className="switch">
            <input type="checkbox" name="timed" value={props.id} 
                onClick={handleClick} defaultChecked={timed} disabled={props.disabled} />
            <span className="slider round"></span>
        </label>
    )
}

export {ToggleStatusButton, ToggleTimedButton };
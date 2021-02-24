import React from 'react';





function Heading(props){
    return (
        <div className="heading">
            <h3>{props.title}</h3>
            <hr />
        </div>
    )
}

export default Heading;
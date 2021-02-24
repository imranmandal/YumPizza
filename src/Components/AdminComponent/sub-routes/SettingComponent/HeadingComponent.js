import React from 'react';






function Heading(props){

    const {title, disabled, edit, done} = props;

    return (
        <div className="heading">
            <h3>{title}</h3>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" onClick={edit} className="btn btn-secondary" disabled={!disabled}>Edit</button>
                <button type="button" onClick={done} className="btn btn-success" disabled={disabled}>Done</button>
            </div>
        </div>
    )
}

export default Heading;
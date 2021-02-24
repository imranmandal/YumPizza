import React from 'react';
import Icon from '../../../iconComponent/Icon';




function InputField(props){
    return(
        <div className="input-group mb-3">
            <label>{props.label}</label>
            <Icon class={props.spanClass} name={props.icon} />
            
            <input type="text" className="form-control" 
                placeholder={props.placeholder}
                disabled={props.disabled} />
        </div>
    )
}

export default InputField;
import React, { useState } from 'react';
import Heading from './HeadingComponent';
import InputField from './InputFieldComponent';

function EditPersonal(){
    const [disabled, setDisabled] = useState(true);

    function edit(){
        setDisabled(false)
    }
    function done(){
        setDisabled(true)
    }

    return(
    <div> 
        <div className="sub-setting">
            <Heading title="Edit personal details" disabled={disabled} edit={edit} done={done} />
            
            <hr />

            <InputField label="Name" placeholder="Name"
                spanClass="input-group-text" icon="face" disabled={disabled} />

            <InputField label="Personal Email" placeholder="user@gmail.com"
                spanClass="input-group-text" icon="email" disabled={disabled} />

            <InputField label="Personal contact number" placeholder="703952965"
                spanClass="input-group-text" icon="tty" disabled={disabled} />

        </div>
    </div>
    )
}


export default EditPersonal;
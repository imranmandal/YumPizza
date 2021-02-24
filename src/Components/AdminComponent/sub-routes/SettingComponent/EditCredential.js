import React, { useState } from 'react';
import Heading from './HeadingComponent';
import InputField from './InputFieldComponent';

function EditCredential(){

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
            <Heading title="Credential Details" disabled={disabled} edit={edit} done={done} />
            
            <hr />
          
            <InputField label="Paytm number" spanClass="input-group-text" icon="payment" disabled={disabled} />
      
            <InputField label="GPay number" spanClass="input-group-text" icon="payment" disabled={disabled} />

            <InputField label="Phone pay" spanClass="input-group-text" icon="payment" disabled={disabled} />

            <InputField label="BHIM UPI" spanClass="input-group-text" icon="payment" disabled={disabled} />
            
            
        </div>
    </div>
    )
}


export default EditCredential;
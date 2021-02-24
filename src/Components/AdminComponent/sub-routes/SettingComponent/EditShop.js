import React, { useState } from 'react';
import Heading from './HeadingComponent';
import InputField from './InputFieldComponent';

function EditShop(){

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
            <Heading title="Edit shop details" disabled={disabled} edit={edit} done={done} />
            
            <hr />

            <InputField label="GST number" placeholder="15-digit GST number..."
                spanClass="input-group-text" icon="store" disabled={disabled} />

            <InputField label="Shop name" placeholder="Yum Pizza"
                spanClass="input-group-text" icon="storefront" disabled={disabled} />

            <InputField label="Address 1" placeholder="Street/area/locality"
                spanClass="input-group-text" icon="map" disabled={disabled} />

            <InputField label="Address 2" placeholder="Town/city"
                spanClass="input-group-text" icon="map" disabled={disabled} />

            <InputField label="Shop Email" placeholder="shop@gmail.com"
                spanClass="input-group-text" icon="email" disabled={disabled} />

            <InputField label="Contact number" placeholder="703952965"
                spanClass="input-group-text" icon="tty" disabled={disabled} />
        </div>
    </div>
    )
}


export default EditShop;
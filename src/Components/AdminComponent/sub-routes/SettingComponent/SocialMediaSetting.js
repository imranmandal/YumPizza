import React, { useState } from 'react';
import Heading from './HeadingComponent';
import InputField from './InputFieldComponent';

function SocialMediaSetting(){

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
            <Heading title="Social media settings"
             edit={edit} done={done} disabled={disabled} />
            
            <hr />

            <div>
                <InputField label="Facebook url" placeholder="www.facebook.com"
                spanClass="input-group-text" icon="facebook" disabled={disabled} />

                <InputField label="Twitter url" placeholder="www.twitter.com"
                spanClass="input-group-text" icon="flutter_dash" disabled={disabled} />

                <InputField label="Linkedin url" placeholder="www.Linkedin.com"
                spanClass="input-group-text" icon="assignment_ind" disabled={disabled} />

                <InputField label="Pinterest url" placeholder="www.pinterest.com"
                spanClass="input-group-text" icon="filter_vintage" disabled={disabled} />
                
            </div>
        </div>
    </div>
    )
}


export default SocialMediaSetting;
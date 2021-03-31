import React, { useState } from "react";
import Heading from "./HeadingComponent";
import InputField from "./InputFieldComponent";
import axios from "axios";

function EditCredential() {
    const [data, setData] =  useState({
        paytm: '',
        gpay: '',
        phonepay: '',
        bhim: '',
    })
  const [disabled, setDisabled] = useState(true);

  function edit() {
    setDisabled(false);
  }

  function done() {
    // axios.post(`${process.env.REACT_APP_SERVER_URL}items`, data).then(
    //   (res) => console.log("Added."),
    //   (error) => console.log(error)
    // );
    setDisabled(true);
  }

  const handleChange=(e)=>{
      const {name, value} = e.target;
      setData(prevValue=> ({...prevValue, [name]: value}))
  }

  return (
    <div>
      <div className="sub-setting">
        <Heading
          title="Credential Details"
          disabled={disabled}
          edit={edit}
          done={done}
        />

        <hr />

        <InputField
          label="Paytm number"
          name="paytm"
          value={data.paytm}
          change={handleChange}
          icon="payment"
          disabled={disabled}
        />

        <InputField
          label="GPay number"
          name='gpay'
          value={data.gpay}
          change={handleChange}
          icon="payment"
          disabled={disabled}
        />

        <InputField
          label="Phone pay"
          name="phonepay"
          value={data.phonepay}
          change={handleChange}
          icon="payment"
          disabled={disabled}
        />

        <InputField
          label="BHIM UPI"
          name="bhim"
          value={data.bhim}
          change={handleChange}
          icon="payment"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default EditCredential;

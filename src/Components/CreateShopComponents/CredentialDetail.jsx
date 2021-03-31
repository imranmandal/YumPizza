import React, { useState, useEffect } from "react";

function CredentialDetail(props) {
  const [details, setDetails] = useState({
    paytmNo: "",
    bhimUpi: "",
    phonePay: "",
  });

  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (details.paytmNo === "") {
      return setDisableNext(true);
    }
    if (details.bhimUpi === "") {
      return setDisableNext(true);
    }
    if (details.phonePay === "") {
      return setDisableNext(true);
    }
    setDisableNext(false);
    props.setData(prevValue=>({...prevValue, CredentialData: details}));
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevValue) => ({ ...prevValue, [name]: value }));
  };
  return (
    <>
      <p>
        {props.currentStep} of {props.totalSteps} steps
      </p>
      <h1>Credentials</h1>
      <label htmlFor="first">Paytm</label>
      <input
        className="form-control"
        id="first"
        type="text"
        name="paytmNo"
        value={details.paytmNo}
        onChange={handleChange}
        autoComplete="off"
      />
      <label htmlFor="second">BHIM UPI</label>
      <input
        className="form-control"
        id="second"
        type="text"
        name="bhimUpi"
        value={details.bhimUpi}
        onChange={handleChange}
        autoComplete="off"
      />
      <label htmlFor="third">Phone Pay</label>
      <input
        className="form-control "
        id="third"
        type="text"
        name="phonePay"
        value={details.phonePay}
        onChange={handleChange}
        autoComplete="off"
      />
      <button onClick={props.previousStep}>Previous</button>
      <button onClick={props.nextStep} disabled={disableNext}>Next</button>
    </>
  );
}

export default CredentialDetail;

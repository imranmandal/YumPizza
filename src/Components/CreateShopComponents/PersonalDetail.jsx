import axios from "axios";
import React, { useState, useEffect } from "react";

function PersonalDetail(props) {
  const [details, setDetails] = useState({
    ownerName: "",
    phone: "",
    email: "",
  });

  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (details.ownerName === "") {
      return setDisableNext(true);
    }
    if (details.phone === "") {
      return setDisableNext(true);
    }
    if (details.email === "") {
      return setDisableNext(true);
    }
    setDisableNext(false);
    props.setData(prevValue=>({...prevValue, PersonalData: details}));
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const userId = localStorage.getItem("id");
  const handleClick = () => {
    const shop = {shopId: userId, ...props.data};
    axios.post(`${process.env.REACT_APP_SERVER_URL}create-shop`, shop).then(res=>alert(res.data));
  };
  return (
    <>
      <p>
        {props.currentStep} of {props.totalSteps} steps
      </p>
      <h1>Personal Detail</h1>
      <label htmlFor="first">Owner Name</label>
      <input
        className="form-control"
        id="first"
        type="text"
        name="ownerName"
        value={details.ownerName}
        onChange={handleChange}
        autoComplete="off"
      />
      <label htmlFor="second">Phone</label>
      <input
        className="form-control"
        id="second"
        type="text"
        name="phone"
        value={details.phone}
        onChange={handleChange}
        autoComplete="off"
      />
      <label htmlFor="third">Email</label>
      <input
        className="form-control"
        id="third"
        type="text"
        name="email"
        value={details.email}
        onChange={handleChange}
        autoComplete="off"
      />
      <button onClick={props.previousStep}>Previous</button>
      <button onClick={handleClick} disabled={disableNext}>Next</button>
    </>
  );
}

export default PersonalDetail;

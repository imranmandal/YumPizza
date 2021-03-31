import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

function ShopDetail(props) {
  const [details, setDetails] = useState({
    shopName: "",
    gst: "",
    shopEmail: "",
    shopPhone: "",
    shopAddress1: "",
    shopAddress2: "",
  });

  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (details.shopName === "") {
      return setDisableNext(true);
    }
    if (details.gst === "") {
      return setDisableNext(true);
    }
    if (details.shopAddress1 === "") {
      return setDisableNext(true);
    }
    if (details.shopAddress2 === "") {
      return setDisableNext(true);
    }
    setDisableNext(false);
    props.setData(prevValue=>({...prevValue, ShopData: details}));
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
      <motion.h1
      // animate={{ scale: [1, 1.1, 1] }}
      >
        Shop Details
      </motion.h1>
      <label htmlFor="first">Shop Name</label>
      <input
        className="form-control"
        id="first"
        type="text"
        name="shopName"
        value={details.shopName}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="second">Shop GST</label>
      <input
        className="form-control"
        id="second"
        type="text"
        name="gst"
        value={details.gst}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="third">Shop Email</label>
      <input
        className="form-control"
        id="third"
        type="text"
        name="shopEmail"
        value={details.shopEmail}
        onChange={handleChange}
        autoComplete="off"
      />
      <label htmlFor="four">Shop Phone</label>
      <input
        className="form-control"
        id="four"
        type="text"
        name="shopPhone"
        value={details.shopPhone}
        onChange={handleChange}
        autoComplete="off"
      />
      <label htmlFor="four">Shop Address 1</label>
      <input
        className="form-control"
        id="five"
        type="text"
        name="shopAddress1"
        value={details.shopAddress1}
        onChange={handleChange}
        autoComplete="off"
      />
      <label htmlFor="four">Shop Address 2 </label>
      <input
        className="form-control"
        id="six"
        type="text"
        name="shopAddress2"
        value={details.shopAddress2}
        onChange={handleChange}
        autoComplete="off"
      />
      
      <button onClick={props.nextStep} disabled={disableNext}>
        Next
      </button>
    </>
  );
}

export default ShopDetail;

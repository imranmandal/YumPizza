import React, { useEffect, useState } from "react";
import CredentialDetail from "./CredentialDetail";
import PersonalDetail from "./PersonalDetail";
import ShopDetail from "./ShopDetail";
import StepWizard from "react-step-wizard";

function CreateShop() {
  const [details, setDetails] = useState({
    ShopData: {
      shopName: "",
      gst: "",
      shopAddress1: "",
      shopAddress2: "",
    },
    CredentialData: {
      paytmNo: "",
      bhimUpi: "",
      phonePay: "",
    },
    PersonalData: {
      ownerName: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    console.log(details);
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <>
      <div className="container">
        <div className="container-fluid">
          <h1>Create Shop</h1>
          <StepWizard>
            <ShopDetail setData={setDetails} />
            <CredentialDetail setData={setDetails} />
            <PersonalDetail data={details} setData={setDetails} />
          </StepWizard>
        </div>
      </div>
    </>
  );
}

export default CreateShop;

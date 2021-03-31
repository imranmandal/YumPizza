import React, { useState, useEffect } from "react";
import axios from 'axios';
import Heading from "./HeadingComponent";
import InputField from "./InputFieldComponent";

function EditPersonal() {
  const [disabled, setDisabled] = useState(true);
  const [shopPersonal, setShopPersonal] = useState({
    shopId: localStorage.getItem("id"),
    name: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    axios
      .post("${process.env.REACT_APP_SERVER_URL}settings/shop-personal", shopPersonal)
      .then((res) => setShopPersonal(res.data));

    console.log(localStorage.getItem("id"));
  }, []);

  function edit() {
    setDisabled(false);
  }

  function done() {
    axios
      .put("${process.env.REACT_APP_SERVER_URL}settings/shop-personal", shopPersonal)
      .then((res) => console.log(res.data), setDisabled(true));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopPersonal((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div>
      <div className="sub-setting">
        <Heading
          title="Edit personal details"
          disabled={disabled}
          edit={edit}
          done={done}
        />

        <hr />

        <InputField
          label="Name"
          placeholder="Name"
          spanClass="input-group-text"
          icon="face"
          disabled={disabled}
          name="name"
          value={shopPersonal.name}
          change={handleChange}
        />

        <InputField
          label="Personal Email"
          placeholder="user@gmail.com"
          spanClass="input-group-text"
          icon="email"
          disabled={disabled}
          name="email"
          value={shopPersonal.email}
          change={handleChange}
        />

        <InputField
          label="Personal contact number"
          placeholder="703952965"
          spanClass="input-group-text"
          icon="tty"
          disabled={disabled}
          name="contact"
          value={shopPersonal.contact}
          change={handleChange}
        />
      </div>
    </div>
  );
}

export default EditPersonal;

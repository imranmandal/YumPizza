import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./HeadingComponent";
import InputField from "./InputFieldComponent";

function EditShop() {
  const [disabled, setDisabled] = useState(true);
  const [detail, setDetail] = useState({
    shopId: localStorage.getItem("id"),
    shopName: "",
    gst: "",
    shopEmail: "",
    contact: "",
    addr1: "",
    addr2: "",
  });

  useEffect(() => {
    axios
      .post("${process.env.REACT_APP_SERVER_URL}settings/shop-detail", detail)
      .then((res) => setDetail(res.data));

    console.log(localStorage.getItem("id"));
  }, []);

  function edit() {
    setDisabled(false);
  }

  function done() {
    axios
      .put("${process.env.REACT_APP_SERVER_URL}settings/shop-detail", detail)
      .then((res) => console.log(res.data), setDisabled(true));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div>
      <div className="sub-setting">
        <Heading
          title="Edit shop details"
          disabled={disabled}
          edit={edit}
          done={done}
        />

        <hr />
        <InputField
          label="Shop name"
          placeholder="Yum Pizza"
          icon="storefront"
          disabled={disabled}
            name="shopName"
            value={detail.shopName}
            change={handleChange}
        />

        <InputField
          label="GST number"
          placeholder="15-digit GST number..."
          icon="store"
          disabled={disabled}
            name="gst"
            value={detail.gst}
            change={handleChange}
        />

        <InputField
          label="Shop Email"
          placeholder="shop@gmail.com"
          icon="email"
          disabled={disabled}
            name="shopEmail"
            value={detail.shopEmail}
            change={handleChange}
        />

        <InputField
          label="Contact number"
          placeholder="0000 0000 00"
          icon="tty"
          disabled={disabled}
            name="contact"
            value={detail.contact}
            change={handleChange}
        />

        <InputField
          label="Address 1"
          placeholder="Street/area/locality"
          icon="map"
          disabled={disabled}
            name="addr1"
            value={detail.addr1}
            change={handleChange}
        />

        <InputField
          label="Address 2"
          placeholder="Town/city"
          icon="map"
          disabled={disabled}
            name="addr2"
            value={detail.addr2}
            change={handleChange}
        />
      </div>
    </div>
  );
}

export default EditShop;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "./HeadingComponent";
import InputField from "./InputFieldComponent";

function SocialMediaSetting() {
  const [disabled, setDisabled] = useState(true);
  const [social, setSocial] = useState({
    shopId: localStorage.getItem("id"),
    fb: "",
    insta: "",
    twt: "",
    pin: "",
  });
  useEffect(() => {
    axios
      .post("http://localhost:4000/settings/socials", social)
      .then((res) => setSocial(res.data));

    console.log(localStorage.getItem("id"));
  }, []);

  function edit() {
    setDisabled(false);
  }

  function done() {
    axios
      .put("${process.env.REACT_APP_SERVER_URL}settings/socials", social)
      .then((res) => console.log(res.data), setDisabled(true));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocial((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div>
      <div className="sub-setting">
        <Heading
          title="Social media settings"
          edit={edit}
          done={done}
          disabled={disabled}
        />

        <hr />

        <div>
          <InputField
            label="Facebook url"
            placeholder="www.facebook.com"
            spanClass="input-group-text"
            icon="facebook"
            disabled={disabled}
            change={handleChange}
            name="fb"
            value={social.fb}
          />

          <InputField
            label="Intagram url"
            placeholder="www.instagram.com"
            spanClass="input-group-text"
            icon="facebook"
            disabled={disabled}
            change={handleChange}
            name="insta"
            value={social.insta}
          />

          <InputField
            label="Twitter url"
            placeholder="www.twitter.com"
            spanClass="input-group-text"
            icon="flutter_dash"
            disabled={disabled}
            change={handleChange}
            name="twt"
            value={social.twt}
          />

          <InputField
            label="Pinterest url"
            placeholder="www.pinterest.com"
            spanClass="input-group-text"
            icon="filter_vintage"
            disabled={disabled}
            change={handleChange}
            name="pin"
            value={social.pin}
          />
        </div>
        <p>This will be visible to customers.</p>
      </div>
    </div>
  );
}

export default SocialMediaSetting;

import React from "react";
import Icon from "../../../iconComponent/Icon";

function InputField(props) {
  const handleChange = (e) => {
    props.change(e);
  };

  return (
    <div className="input-group mb-3">
      <label>{props.label}</label>
      <Icon class="input-group-text" name={props.icon} />

      <input
        type="text"
        name={props.name}
        value={props.value}
        onChange={handleChange}
        className="form-control"
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </div>
  );
}

export default InputField;

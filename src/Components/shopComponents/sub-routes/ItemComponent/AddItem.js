import axios from "axios";
import React, { useState } from "react";
import Icon from "../../../iconComponent/Icon";

function AddItem(props) {
  const { itemCount, setItemCount } = props;
  const id = localStorage.getItem("id");

  const [data, setData] = useState({
    shopId: id,
    img: "",
    imgName: "",
    imgData: "",
    name: "",
    price: "",
    category: "",
    veg: "",
    timed: false,
    from: "",
    to: "",
    status: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function handleTimed(e) {
    const name = e.target.name;
    setData((prevValue) => ({ ...prevValue, [name]: !prevValue.timed }));
  }

  function img_pathUrl(e) {
    setData((prevValue) => ({
      ...prevValue,
      img: URL.createObjectURL(e.target.files[0]),
      imgName: e.target.files[0].name,
      imgData: e.target.files[0],
    }));
  }

  function addItem(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("shopId", data.shopId);
    formData.append("imgName", data.imgName);
    formData.append("imgData", data.imgData);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("timed", data.timed);
    formData.append("from", data.from);
    formData.append("to", data.to);
    formData.append("status", data.status);

    try {
      axios.post(`${process.env.REACT_APP_SERVER_URL}items`, formData).then(
        (res) => {
          console.log(res.data);
          setDisplay();
          setItemCount(itemCount + 1); // ---- FOR GET REQUEST IN TABLECOMPONENT
        },
        (err) => {
          if (err.response.status === 400) {
            alert(err.response.data);
          } else if(err.response.status === 402) {
            alert(err.response.data);
          }
        }
      );
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        console.log("there was problem with server.");
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  function setDisplay() {
    props.addItem();
  }

  function imgError(e) {
    e.target.src = "http://cdn.onlinewebfonts.com/svg/img_212908.png";
  }

  return (
    <>
      <form onSubmit={addItem} encType="multipart/form-data">
        <div className="row p-5">
          {/* ------- IMAGE */}
          <div className="pizza-img col-3.5">
            <input
              type="file"
              id="img"
              name="itemImage"
              accept="image/*"
              onChange={img_pathUrl}
              hidden
            />
            <label className="label p-2 m-5" htmlFor="img">
              <img
                onChange={handleChange}
                name="img"
                id="img_url"
                className="addimg"
                src={data.img}
                onErrorCapture={imgError}
                alt="profile"
              />
            </label>
          </div>

          <div className="pizza-detail col-8">
            {/* ----- NAME, PRICE, CATEGORY, STATUS */}
            <div className="d-flex justify-content-around">
              <input
                onChange={handleChange}
                type="text"
                className="p-2 m-2"
                name="name"
                value={data.name}
                placeholder="Pizza name"
              />

              <select
                onChange={handleChange}
                value={data.category}
                name="category"
                className="p-2 m-2"
              >
                <option value="">Select Category</option>
                <option value="Pizza">Pizza</option>
                <option value="Drinks">Cold drinks</option>
              </select>
            </div>

            <div className="d-flex justify-content-around">
              <div className="position-relative">
                <input
                  className="p-2 m-2"
                  onChange={handleChange}
                  type="text"
                  name="price"
                  value={data.price}
                  id=""
                  placeholder="Price"
                />
                <span className="rupee position-absolute">&#8377;</span>
              </div>

              <select
                className="px-4 py-2 m-2"
                onChange={handleChange}
                value={data.status}
                name="status"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="non-active">Non Active</option>
              </select>
            </div>

            <div className="d-flex justify-content-center">
              {/* ------- TIMED */}
              <div className="d-flex flex-column justify-content-around p-2 m-2">
                <label htmlFor="timed" className="py-2 ">
                  Timed
                </label>
                <label className="switch">
                  <input
                    onChange={handleTimed}
                    value={data.timed}
                    id="timed"
                    type="checkbox"
                    name="timed"
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="d-flex flex-column justify-content-around p-2 m-2">
                <label htmlFor="from" className="p-2 m-2">
                  From
                </label>
                <input
                  onChange={handleChange}
                  id="from"
                  value={data.from}
                  type="time"
                  name="from"
                  className="p-2 m-2"
                />
              </div>
              <div className="d-flex flex-column justify-content-around p-2 m-2">
                <label htmlFor="to" className="p-2 m-2">
                  To
                </label>
                <input
                  onChange={handleChange}
                  id="to"
                  value={data.to}
                  type="time"
                  name="to"
                  className="p-2 m-2"
                />
              </div>

              {/* -------- ADD BTN */}
              <div className="p-2 mt-auto mb-3">
                <button
                  className="btn btn-danger add-item-btn justify-content-end"
                  id="addButton"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Add Item"
                  value="submit"
                  type="submit"
                >
                  <Icon name="add_circle" /> &nbsp; Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddItem;

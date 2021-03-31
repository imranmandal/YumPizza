import React from "react";
import Icon from "../../../iconComponent/Icon";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

function Filter(props) {
  function handleFilter(e) {
    props.handleFilter(e);
  }

  function addItem(e) {
    props.addItem();
  }

  return (
    <div className="filter">
      <div>
        <button
          className="btn btn-danger add-item-btn"
          onClick={addItem}
          id="addButton"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Add Item"
        >
          {!props.display ? (
            <>
              <AddCircleOutlineRoundedIcon /> &nbsp;
              {props.btnTxt}
            </>
          ) : (
            <>
              <CancelOutlinedIcon />
              &nbsp;CANCEL
            </>
          )}
        </button>
      </div>
      <div className="dropdowns">
        <select onChange={handleFilter} className="dropdown-list">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="non-active">Non-Active</option>
        </select>
        <input className="search-box" type="text" placeholder="Search" />
        <button className="search-btn">
          <Icon name="search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;

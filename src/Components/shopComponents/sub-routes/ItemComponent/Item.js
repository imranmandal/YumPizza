import React, { useState } from "react";
import Heading from "./HeadingComponent";
import Table from "./Table/TableComponent";
import Filter from "./Filter";
import AddItem from "./AddItem";

function Item() {
  const [filter, setFilter] = useState("all"); // For filtering active non-active

  function handleFilter(e) {
    const option = e.target.value;
    setFilter(option);
  }

  const [display, setDisplay]= useState(false);

  // ---- FOR GET REQUEST
  const [itemCount, setItemCount] = useState(0);

  function addItem() {
    setDisplay((prevValue) => !prevValue);
  }

  return (
    <div>
      <div className="item">
        <Heading title="Items" />

        <div>
          <Filter
            btnTxt="ADD ITEM"
            handleFilter={handleFilter}
            addItem={addItem}
            display={display}
          />
          <div>
            {display ? (
              <AddItem
                addItem={addItem}
                itemCount={itemCount}
                setItemCount={setItemCount}
              />
            ) : null}
          </div>
        </div>
        <div>
          <Table
            name="items"
            filter={filter}
            itemCount={itemCount}
            setItemCount={setItemCount}
          />
        </div>
      </div>
    </div>
  );
}

export default Item;

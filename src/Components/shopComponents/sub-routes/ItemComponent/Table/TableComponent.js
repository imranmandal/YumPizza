import axios from "axios";
import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";

function Table(props) {
  const { name, filter } = props;
  const [data, setData] = useState([]);
  const {itemCount, setItemCount} = props;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}` + route).then((res) => {
      setData(res.data);
    });
  }, [itemCount]);

  const route = name;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item Image</th>
          <th scope="col">Item Name</th>
          <th scope="col">Price</th>
          <th scope="col">Category Name</th>
          <th scope="col">Timed</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((i, index) =>
          /// filtering which items should appear
          filter === "all" ? (
            <TableRow
              key={i._id}
              id={i._id}
              index={index + 1}
              img={i.imgPath}
              name="item"
              nameValue={i.name}
              price={i.price}
              category={i.category}
              timed={i.timed}
              status={i.status}
              itemCount={itemCount} 
              setItemCount={setItemCount}
            />
          ) : filter === "active" ? (
            i.status === "active" && (
              <TableRow
                key={index}
                id={index + 1}
                img={i.imgPath}
                name="item"
                nameValue={i.name}
                price={i.price}
                category={i.category}
                timed={i.timed}
                status={i.status}
                itemCount={itemCount} 
              setItemCount={setItemCount}
              />
            )
          ) : filter === "non-active" ? (
            i.status === "non-active" && (
              <TableRow
                key={index}
                id={index + 1}
                img={i.imgPath}
                name="item"
                nameValue={i.name}
                price={i.price}
                category={i.category}
                timed={i.timed}
                status={i.status}
                itemCount={itemCount} 
              setItemCount={setItemCount}
              />
            )
          ) : null
        )}
      </tbody>
    </table>
  );
}

export default Table;

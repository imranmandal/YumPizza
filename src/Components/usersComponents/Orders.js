import axios from "axios";
import React, { useEffect, useState } from "react";

function Orders() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/transactions").then((res) => {
      setTransactions(() => [...res.data]);
      console.log(res.data);
    });
  }, []);

  return (
    <>  
      <h1>Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Order Date</th>
            <th scope="col">Order Time</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tran, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{tran.productName}</td>
                <td>{tran.amount} &#8377;</td>
                <td>{tran.date}</td>
                <td>{tran.time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>1</td>
              <td colSpan="3">No Orders yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Orders;

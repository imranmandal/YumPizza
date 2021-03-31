import axios from "axios";
import React, { useEffect, useState } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/transactions").then((res) => {
      setTransactions(() => [...res.data]);
    });
  }, []);

  return (
    <>
      <h1>Transactions</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Transaction Id</th>
            <th scope="col">Transaction Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tran, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{tran.productName}</td>
                  <td>{tran.amount} &#8377;</td>
                  <td>{tran.transactionId}</td>
                  <td>{tran.transactionStatus}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>1</td>
              <td colSpan="3">No Transaction yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Transactions;

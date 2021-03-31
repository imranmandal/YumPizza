import React, { useState } from "react";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useHistory } from "react-router";

function Payment(props) {
  const history = useHistory();
  const data = props.location.data;
  const [products, setProducts] = useState([data]);
  const userId = localStorage.getItem("id");
  const total = localStorage.getItem(`totalOf${userId}`);

  const cart = JSON.parse(localStorage.getItem(`cartOf${userId}`));

  const handleToken = (token) => {
    axios
      .post("http://localhost:4000/payment", {
        token,
        products,
      })
      .then((res) => {
        if (res.status === 200) {
          const userId = localStorage.getItem("id");
          const currentItem = [...cart.filter((item) => {
            return item.itemId === data.itemId;
          })];
          console.log(currentItem[0].itemId);

          const remainItem = [...cart.filter((item) => {
            return item.itemId !== data.itemId;
          })];
          console.log(remainItem);

          const updatedCurrentItem = [
            ...remainItem,
            {
              itemId: currentItem[0].itemId,
              qty: currentItem[0].qty,
              status: "paid",
            },
          ];
          console.log(updatedCurrentItem);

          localStorage.setItem(
            `cartOf${userId}`,
            JSON.stringify(updatedCurrentItem)
          );
          
          history.push('/cart');
          
        } else {
          alert("Some error occurred.");
        }
      });
  };

  return (
    <>
      <div className="payment d-flex">
        <div className="payment-side-img col-2 p-0">
          <img src="/images/payimg.jpg" alt="" />
        </div>
        <div className="col-10 payment-options container">
          <div className="payment-options-child p-5 ">
            <h4>Select Payment option</h4>
            <div className="d-flex justify-content-between">
              <div className="col-6 p-0">
                <div className="online-payments d-flex flex-column py-4">
                  <label className="text-secondary">Online payment</label>
                  <p className="d-flex justify-content-between m-0 p-2">
                    Paytm <ArrowRightRoundedIcon />
                  </p>
                  <p className="d-flex justify-content-between m-0 p-2">
                    Gpay <ArrowRightRoundedIcon />
                  </p>
                  <p className="d-flex justify-content-between m-0 p-2">
                    Phone Pay <ArrowRightRoundedIcon />
                  </p>
                  <p className="d-flex justify-content-between m-0 p-2">
                    BHIM upi <ArrowRightRoundedIcon />
                  </p>
                  <p className="d-flex justify-content-between m-0 p-2">
                    <StripeCheckout
                      stripeKey="pk_test_51IaDoPSBIwLEOkGjtXtFsZE7Au2miV7F2uN4RYaLCQDmdLjrssukonYL8IhKiu1MvVLiRGHuDxq9LgST7Pu0v9PJ000RnSRjed"
                      token={handleToken}
                      billingAddress
                      shippingAddress
                      amount={data.price * 100}
                      name={data.name}
                      currency="INR"
                    />
                    <ArrowRightRoundedIcon />
                  </p>
                </div>
                <div className="py-3 cod">
                  <label
                    htmlFor="cod"
                    className="d-flex justify-content-between p-2"
                  >
                    Cash On Delivery (COD)
                    <ArrowRightRoundedIcon />
                  </label>
                </div>
              </div>
              <div>
                <h3>Total &nbsp; {total} &#8377;</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;

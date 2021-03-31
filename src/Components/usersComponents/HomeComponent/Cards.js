import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth.context/authContext";

function Cards(props) {
  const [qty, setQty] = useState(1);
  const { id, name, shopId, img, price, rating, cart, setCart } = props;
  const cartContext = useContext(AuthContext);

  console.log(shopId);
  useEffect(() => {
    const userId = localStorage.getItem("id");
    localStorage.setItem(`cartOf${userId}`, JSON.stringify(cart));
  }, [cart]);

  const orderAlert = (value) => {
    alert("at a time only 5 pizza available right now.");
    return value;
  };
  const handaleChange = (e) => {
    setQty((prevValue) =>
      e.target.value === "-"
        ? prevValue === 1
          ? prevValue
          : prevValue - 1
        : e.target.value === "+" &&
          (prevValue === 5 ? orderAlert(prevValue) : prevValue + 1)
    );
  };

  const addToCart = (e) => {
    const { value } = e.target;

    const tempCart = cart.filter(function (v) {
      return v.itemId !== value;
    });
    if (tempCart.length < cart.length) {
      setCart((prevValue) => [...tempCart, { itemId: value, qty: qty, status: "pending" }]);
    } else {
      cartContext.cartCountDispatch({ type: "add" });
      setCart((prevValue) => [...tempCart, { itemId: value, qty: qty, status: "pending" }]);
    }
  };

  return (
    <div className="card-child px-4 py-4 m-3 col-md-5">
      <div className="row">
        <div className="card-img col-md-6 col-12">
          <img src={img} alt="img"></img>
        </div>
        <div className="info col-md-6 col-12">
          <h5>{name}</h5>
          <div className="info-para">
            <p> {price} &#8377;</p>
            <p> {" " + rating + "⭐"} </p>
          </div>
        </div>
      </div>

      <div className="card-btn d-flex flex-column">
        <div className="d-flex">
          <button value={id} className="addToCartBtn" onClick={addToCart}>
            Add to Cart
          </button>

          <div className="qty">
            <button value="-" onClick={handaleChange}>
              -
            </button>
            <p>{qty}</p>
            <button value="+" onClick={handaleChange}>
              +
            </button>
          </div>
        </div>
        <div>
          <button className="btn btn-danger w-100 text-warning p-2">Buy now</button>
        </div>
      </div>
    </div>
  );
}

export default Cards;

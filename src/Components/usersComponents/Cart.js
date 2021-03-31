import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth.context/authContext";
import { Link, useHistory } from "react-router-dom";

function Cart() {
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("name");

  const history = useHistory();
  const cartContext = useContext(AuthContext);

  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem(`cartOf${userId}`))) {
      return null;
    }
    if (JSON.parse(localStorage.getItem(`cartOf${userId}`))) {
      const Items = JSON.parse(localStorage.getItem(`cartOf${userId}`));
      Items.map((item) => {
        axios.post("http://localhost:4000/cart", item).then((res) => {
          setCartItem((prevValue) => [
            ...prevValue,
            {
              itemId: item.itemId,
              shopId: res.data.shopId,
              name: res.data.name,
              price: res.data.price,
              status: item.status,
              imgPath: res.data.imgPath,
              category: res.data.category,
              qty: item.qty,
            },
          ]);
          setTotalPrice(
            (prevTotal) =>
              prevTotal + parseInt(res.data.price) * parseInt(item.qty)
          );
        });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`totalOf${userId}`, totalPrice);
  }, [totalPrice]);

  const remove = (e) => {
    const currentItem = cartItem.filter((item) => {
      return item.itemId === e.target.value;
    });

    console.log(currentItem);

    const filteredItems = cartItem.filter((item) => {
      return item.itemId !== e.target.value;
    });

    setCartItem(filteredItems);
    setTotalPrice(
      (prevTotal) =>
        parseInt(prevTotal) -
        parseInt(currentItem[0].price * parseInt(currentItem[0].qty))
    );
    localStorage.setItem(`cartOf${userId}`, JSON.stringify(filteredItems));
    cartContext.cartCountDispatch({ type: "remove" });
  };

  return (
    <>
      {cartItem.length > 0 ? (
        <div className="container">
          <div className="d-flex justify-content-between container-fluid">
            <h1>Cart Page.</h1>
            <div className="text-secondary total">
              <h3>Total {totalPrice} &#8377;</h3>
            </div>
          </div>

          {cartItem.map((item, i) => {
            return (
              <div key={item.itemId} className="cart-body shadow">
                <div className="cart-item rounded">
                  <div className="cart-item-detail">
                    <div className="cart-item-img">
                      <img src={item.imgPath} alt="pic" />
                    </div>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.category}</p>
                      <p>price {item.price}</p>
                      <p>qty {item.qty}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-start justify-content-around">
                    {/* <button className="trackBtn">Track</button> */}
                    {item.status == "pending" ? (
                      <>
                        <Link
                          to={{
                            pathname: "/payment",
                            data: {
                              ...item,
                              userId: userId,
                              userName: userName,
                            },
                          }}
                          className="text-dark text-decoration-none "
                        >
                          <button className="btn btn-warning w-100">
                            Order
                          </button>
                        </Link>

                        <button
                          className="text-secondary"
                          value={item.itemId}
                          onClick={remove}
                        >
                          Remove X
                        </button>
                      </>
                    ) : item.status === "paid" ? (
                      <button className="trackBtn">Track</button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" container ">
          <div className="d-flex justify-content-around">
            <div className="h-25">
              <img src="/images/empty_cart.png" alt="" />
            </div>
            <div className="w-100 m-auto">
              <h1 className="text-secondary">Nothing in the cart</h1>
              <button
                className="btn btn-success"
                onClick={() => {
                  history.push("/");
                }}
              >
                Go to home.
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;

import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";

function Home() {
  const userId = localStorage.getItem("id");
  const [Items, setItems] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(`cartOf${userId}`)) === null
      ? []
      : JSON.parse(localStorage.getItem(`cartOf${userId}`))
  );
  
  useEffect(() => {
    axios.get("http://localhost:4000/items").then((res) => {
      setItems(res.data);
    });
    console.log(process.env.REACT_APP_SERVER_URL);
  }, []);

  useEffect(() => {
    localStorage.setItem(`cartOf${userId}`, JSON.stringify(cart));
  }, [cart]);
  return (
    <>
      <div className="home">
        <h1 className="text-capitalize">Hello {localStorage.getItem("name")}</h1>
        <div className="d-flex justify-content-around row">
          {Items.map((v) => (
            <Cards
              key={v._id}
              id={v._id}
              shopId={v.shopId}
              name={v.name}
              img={v.imgPath}
              price={v.price}
              rating={v.rating}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

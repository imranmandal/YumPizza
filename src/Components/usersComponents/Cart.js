import React from 'react';




function Cart(){
    return(<div className="cart-container">
        <h1>Cart Page.</h1>
        <div className="cart-body">
            <div className="cart-item">
                <div className="cart-item-detail">
                    <div className="cart-item-img">
                        <img src="https://www.dominos.co.in/files/items/Farmhouse.jpg" alt="pic" />
                    </div>
                    <div className="cart-item-info">
                        <h4>Margharetta</h4>
                        <p>price 3$</p>
                        <p>qty 3</p>
                    </div>
                </div>
                <div className="cart-btn">
                    <button className="trackBtn">Track</button>
                    <button className="cartOrderBtn">Order</button>
                    <button className="removeBtn">Remove X</button>
                </div>
            </div>
        </div>
        <div className="cart-body">
            <div className="cart-item">
                <div className="cart-item-detail">
                    <div className="cart-item-img">
                        <img src="https://www.dominos.co.in/files/items/Farmhouse.jpg" alt="pic" />
                    </div>
                    <div className="cart-item-info">
                        <h4>Margharetta</h4>
                        <p>price 3$</p>
                        <p>qty 3</p>
                    </div>
                </div>
                <div className="cart-btn">
                    <button className="trackBtn">Track</button>
                    <button className="cartOrderBtn">Order</button>
                    <button className="removeBtn">Remove X</button>
                </div>
            </div>
        </div>



        <div className="total">
            <h1>Total 6$</h1>
        </div>
    </div>)
}

export default Cart;
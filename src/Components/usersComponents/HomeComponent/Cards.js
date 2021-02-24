import React, { useState } from 'react';





function Cards(props){
    const [qty, setQty] = useState(1);

    function handaleChange(e){
      setQty((prevValue)=> e.target.value==="-" 
          ? (prevValue===1 ? prevValue : prevValue - 1)
          : e.target.value ==="+" && prevValue+1) 
    }


    return(
        <div className="card-child">
          <div className="card-details">
            <div className="card-img">
                <img src={props.img} alt="img"></img>
            </div>
            <div className="info">
              <h4>{props.name}</h4>
              <div className="info-para">
                <p> {"Price  " + props.price + "$"} </p>
                <p> {"Rating  " + props.rating} </p>
              </div>
            </div>
          </div>

          <div className="card-btn">
              <button className="addToCartBtn">Add to Cart</button>

              <div className='qty'>
                  <button value="-" onClick={handaleChange}>-</button>
                  <p>{qty}</p>
                  <button value="+" onClick={handaleChange}>+</button>
              </div>
          </div>
            {/* <OrderedTxt value={noOfOrders} /> */}
          
        </div>

        
    )
}

export default Cards;
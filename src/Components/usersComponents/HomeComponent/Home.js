import React from 'react';
import Cards from './Cards';





import CartDB from './CartDB'

function Home(){
    
    return(<div className="home">
        <h1>Menu</h1>
        <div className="cards">
            
            {CartDB.map((v)=> 
                <Cards name={v.name} img={v.imgUrl} price={v.price} rating={v.rating} />
            )}
            
        </div>
    </div>)
}

export default Home;
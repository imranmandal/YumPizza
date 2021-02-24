import React, { useState } from 'react';
import Heading from './HeadingComponent';
import Table from './TableComponent';
import Filter from './Filter';



function Item(){

    const [items, setItems] = useState([{
        id: "1",
        name: "Margherita",
        imgUrl: "https://www.dominos.co.in/files/items/Farmhouse.jpg",
        category: "Pizza",
        timed: false,
        status: "active"
    },
    {
        id: "2",
        name: "Thornton",
        imgUrl: "https://www.dominos.co.in/files/items/Farmhouse.jpg",
        category: "Pizza",
        timed: false,
        status: "active"
    },
    {
        id: "3",
        name: "Oscorp",
        imgUrl: "https://www.dominos.co.in/files/items/Farmhouse.jpg",
        category: "Pizza",
        timed: true,
        status: "active"
    },
    {
        id: "4",
        name: "Nappa",
        imgUrl: "https://www.dominos.co.in/files/items/Farmhouse.jpg",
        category: "Pizza",
        timed: false,
        status: "active"
    }
    
    ])

    const [filteredItem, setFilteredItem] = useState(items);

    function handleStatusClick(e){
        const {name, value} = e.target;
        setItems((prevValue)=> prevValue.map((item)=>
            item.id === value ?
            {
                id: item.id,
                name: item.name,
                imgUrl: item.imgUrl,
                category: item.category,
                timed: item.timed,
                status: name
            }   
            :
            item
        ))
    }

    function handleTimedClick(e){
        const {checked, value} = e.target;
        setItems((prevValue)=> prevValue.map((item)=>
            item.id === value ?
            {
                id: item.id,
                name: item.name,
                imgUrl: item.imgUrl,
                category: item.category,
                timed: checked,
                status: item.status
            } 
            :
            item
        ))
    }

    function handleFilter(e){
        const option = e.target.value;
        setFilteredItem((prevValue) => (
            
            option === "1" ?
            items
            :
            option === "2" ?
            items.filter(i => i.status!== "non-active")
            : 
            option === "3" ?
            prevValue.filter(i=> i.status!== "active")
            : 
            items
        ))        
    }

    // function addItem(){
        
    // }

    return(
        <div>
            <div className="item">
                <Heading title="Items" />

                <div>
                    <Filter 
                        btnTxt="ADD ITEM"
                        handleFilter={handleFilter}
                    />
                    
                </div>
                <div>
                    <Table item={filteredItem} 
                        timedClicked={handleTimedClick}
                        statusClicked={handleStatusClick}    
                    />
                </div>
            </div>
           
        </div>
    )
}

export default Item;
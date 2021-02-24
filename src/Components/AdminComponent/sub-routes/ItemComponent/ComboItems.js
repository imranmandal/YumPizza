import React, { useState } from 'react';
import Heading from './HeadingComponent';
import Filter from './Filter';
import Table from './TableComponent';



function ComboItems(){

    const [items, setItems] = useState([{
        id: "1",
        name: "Veg Pizza Combo",
        imgUrl: "https://3.imimg.com/data3/OH/EM/MY-9565527/pizza-combo-veg-500x500.png",
        category: "Pizza",
        timed: false,
        status: "active"
    }])

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
            items.filter(i => i.status=== "active")
            : 
            option === "3" ?
            prevValue.filter(i=> i.status=== "non-active")
            : 
            items
        ))        
    }

    return(
        <div>
            <div className="item">
                <Heading title="Combo Items" />
                
                <div>
                    <Filter 
                        btnTxt="ADD COMBO"
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

export default ComboItems;
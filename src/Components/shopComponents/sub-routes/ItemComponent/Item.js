import React, { useState } from 'react';
import Heading from './HeadingComponent';
import Table from './Table/TableComponent';
import Filter from './Filter';
import AddItem from './AddItem';



function Item(){

    const [filter, setFilter] = useState("all"); // For filtering active non-active

    function handleFilter(e){
        const option = e.target.value;
        setFilter(option);

    }

    const [display, setDisplay]= useState(false);

    function addItem(){
        setDisplay((prevValue)=> !prevValue)
    }

    return(
        <div>
            
            <div className="item">
                <Heading title="Items" />
                
                <div>
                    <Filter 
                        btnTxt="ADD ITEM"
                        handleFilter={handleFilter}
                        addItem={addItem}
                    />
                    <div>
                        {
                            display ? 
                            <AddItem addItem={addItem}/>
                            :
                            null
                        }
                    </div>
                </div>
                <div>
                    <Table name="items" filter={filter} />
                </div>
            </div>
           
        </div>
    )
}

export default Item;
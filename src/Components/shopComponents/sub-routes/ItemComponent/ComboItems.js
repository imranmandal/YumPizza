import React, { useState } from 'react';
import Heading from './HeadingComponent';
import Filter from './Filter';
import Table from './Table/TableComponent';
import AddItem from './AddItem';



function ComboItems(){

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
                <Heading title="Combo Items" />
                
                <div>
                    <Filter 
                        btnTxt="ADD COMBO"
                        handleFilter={handleFilter}
                        addItem={addItem}
                    />
                    <div>
                        {
                            display ? 
                            <AddItem />
                            :
                            null
                        }
                    </div>
                </div>
                <div>
                    <Table name="combo-items" filter={filter} />
                </div>
            </div>
           
        </div>
    )
}

export default ComboItems;
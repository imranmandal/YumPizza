import React, { useState } from 'react';
import Icon from '../../../iconComponent/Icon';



function Filter(){

    const [dateChanged, setDateChanged] = useState(false)

    function changeType(e){
        !dateChanged ?
        (
           e.target.type==="text" ?
           e.target.type = "date" :
           e.target.type = "text"
        )  :
        e.target.type = "date"
    }

    function handleChange(e){
        setDateChanged((prevValue)=> !prevValue)
    }
    function Reset(){
        window.location.reload();
    }

    return(
        <div className="filter">
            <div>
                <button className="btn btn-danger add-item-btn" 
                        onClick={Reset}
                         id="addButton"
                        data-bs-toggle="tooltip" data-bs-placement="top" 
                        title="Reset Filter">
                    <Icon name="sync" />
                    
                </button>
            </div>
            <div className='dropdowns'>
                <input onFocus={changeType} onBlur={changeType} onChange={handleChange}
                    type="text" placeholder="From Date" className='dropdown-list' 
                        
                    />
                <input onFocus={changeType} onBlur={changeType} onChange={handleChange}
                    type="text" placeholder="To Date" className='dropdown-list' 
                    
                    />

                <select
                  className='dropdown-list' >
                    <option value="1">All Type</option>
                    <option value="2">Delivery</option>
                    <option value="3">Pickup</option>
                </select>
                <select
                  className='dropdown-list'>
                    <option value="1">All</option>
                    <option value="2">Pending</option>
                    <option value="4">Accepted</option>
                    <option value="5">Assigned to Deliveryboy</option>
                    <option value="6">Accepted by Deliveryboy</option>
                    <option value="7">On the way</option>
                    <option value="7">Delivered</option>
                    <option value="7">Rejected</option>
                </select>
                <input className="search-box" type='text' placeholder="Search" 
                    
                />
                <button className="search-btn">
                    <Icon name="search" />
                </button>
            </div>
        </div>
    )
}

export default Filter;


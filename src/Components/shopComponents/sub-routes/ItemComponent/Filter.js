import React from 'react';
import Icon from '../../../iconComponent/Icon';




function Filter(props){
    function handleFilter(e){
        props.handleFilter(e);
    }

    function addItem(e){
        props.addItem()
    }

    return(
        <div className="filter">
            <div>
                <button className="btn btn-danger add-item-btn" 
                        onClick={addItem} id="addButton"
                        data-bs-toggle="tooltip" data-bs-placement="top" 
                        title="Add Item">
                    <Icon name="add_circle" /> &nbsp;
                    {props.btnTxt}
                </button>
            </div>
            <div className='dropdowns'>
                <select onChange={handleFilter} className='dropdown-list'>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="non-active">Non-Active</option>
                </select>
                <input className="search-box" type='text' placeholder="Search" />
                <button className="search-btn">
                    <Icon name="search" />
                </button>
            </div>
        </div>
    )
}

export default Filter;


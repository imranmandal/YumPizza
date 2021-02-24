import React, { useState } from 'react';
import Icon from '../../../iconComponent/Icon';
import {ToggleStatusButton, ToggleTimedButton} from './ToggleButton';





function Table(props){

    const {item, timedClicked, statusClicked} = props;
    const [disabled, setDisabled] = useState(true);

    

    function editClicked(){
        setDisabled(!disabled);
    }

    function handleTimedClicked(e) {
        timedClicked(e);
    }
    
    function handleStatusClicked(e) {
        statusClicked(e)
    }

    const [value, setValue] = useState([{
        name: "",
        category: ""
    }])

    function handleChange(e){
        const {name, value} = e.target;
        setValue((prevValue)=> 
            name==="name"?
            {
                name: value,
                category: prevValue.category
            } :
            name === "category" &&
            {
                name: prevValue.name,
                category: value
            }
        )
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Item Image</th>
                <th scope="col">Item Name</th>
                <th scope="col">Category Name</th>
                <th scope="col">Timed</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                
                
                item.map((i)=>


                (
                    
                    <tr key={i.id}>
                    <th scope="row">{i.id}</th>
                    <td>
                        <img src={i.imgUrl}
                        alt="item-img" 
                        className="item-img"
                        />
                    </td>
                    <td>
                        {/* <Input name="name" type="type" disabled={disabled} value={item.name} /> */}
                        <input
                            onChange={handleChange} 
                            name="name" type="text" disabled={disabled} 
                            value={ disabled ? i.name : value.category } 
                        />
                    </td>
                    <td>
                        <input 
                            onChange={handleChange}
                            name="category" type="text" disabled={disabled} 
                            value={ disabled ? i.category : value.category } 
                         />
                    </td>
                    <td>
                        <ToggleTimedButton id={i.id} 
                            timed={i.timed}
                            handleClick={handleTimedClicked} 
                            disabled={disabled}
                        />
                    </td>
                    <td>
                        <ToggleStatusButton id={i.id}
                            status={i.status} 
                            handleClick={handleStatusClicked} 
                            disabled={disabled}
                        />
                    </td>
                    <td>
                        <div className="actions">
                            <div className="edit" onClick={editClicked}
                                 data-bs-toggle="tooltip" data-bs-placement="top" 
                                 title="Edit row">
                                <Icon name="create" />
                            </div>
                            <div className="timer" data-bs-toggle="tooltip" data-bs-placement="top" 
                                title="Add Timestamp">
                                <Icon name="alarm_on" />
                            </div>
                            <div className="delete" data-bs-toggle="tooltip" data-bs-placement="top" 
                                title="Delete">
                                <Icon name="delete_outline" />
                            </div>

                        </div>
                    </td>
                    </tr>)
                )
                
            }
            </tbody>
        </table>
    )
}

export default Table;
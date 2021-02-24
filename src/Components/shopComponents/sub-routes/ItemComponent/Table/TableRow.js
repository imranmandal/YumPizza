import axios from 'axios';
import React , { useState } from 'react';
import Icon from '../../../../iconComponent/Icon';
import {ToggleStatusButton, ToggleTimedButton} from '../ToggleButton';
 
function TableRow(props) {

    const { id, index, name, img, nameValue, category, timed, status} = props;
    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState({
        id: id,
        img: img,
        name: nameValue,
        category: category,
        timed: timed,
        status: status
    })

        
    function handleChange(e){
        const {name, value} = e.target;
        setValue((prevValue)=>( 
            { ...prevValue, [name] : value}
        ))
    }

    function handleStatusClicked(e){
        setValue(prevValue=> (
            prevValue.status === "active" ?
            { ...prevValue, status : "non-active"} :
            { ...prevValue, status : "active"}
        ))
    }

    function handleTimedClicked(e){
        setValue(prevValue=> (
            {...prevValue, timed : !prevValue.timed } 
        ))
    }    

    function editClicked(){
        setDisabled(!disabled);
    }

    function doneClicked(){
        setDisabled(!disabled);
        axios.put(`http://localhost:4000/items`, value).then((doc)=>{
            alert(doc.data.name + " " + doc.data.category + " is updated.");
        });
    }

    function deleteItem(){
       ( window.confirm(
            'Are you sure ? You want to Delete ' + value.name + " " + value.category
        )) ? 
        axios.delete(`http://localhost:4000/items`, {data: { id: value.id}}).then((doc)=>{
            alert(doc.data.name + " " + doc.data.category + " Deleted.");
        })
        :
        alert('Item is safe.')

    }

    return (
        <tr>

            <th scope="row">{index}</th>
            {/* <input type="text" name="id" value={id} hidden /> */}
            <td>
                <img src={img}
                alt="item-img" 
                className="item-img"
                />
            </td>
            <td>
                
                <input
                    onChange={handleChange} 
                    name="name" type="text" disabled={disabled} 
                    value={ value.name || nameValue } 
                />
            </td>
            <td>
                <input 
                    onChange={handleChange}
                    name="category" type="text" disabled={disabled} 
                    value={ value.category || category } 
                    />
            </td>
            <td>
                <ToggleTimedButton id={id} 
                    timed={timed}
                    handleClick={handleTimedClicked} 
                    disabled={disabled}
                />
            </td>
            <td>
                <ToggleStatusButton id={id}
                    status={status} 
                    handleClick={handleStatusClicked} 
                    disabled={disabled}
                />
            </td>
            <td>
                <div className="actions">
                    <div className="edit"
                            data-bs-toggle="tooltip" data-bs-placement="top" 
                            title="Edit row" >
                        {
                            disabled ?
                            <div onClick={editClicked}>
                                <Icon class={""} name= { "create" } />
                            </div>
                            :
                            <div onClick={doneClicked}>
                                <Icon class={"done"} name= { "done" } />
                            </div>
                        }

                    </div>
                    <div className="timer" data-bs-toggle="tooltip" data-bs-placement="top" 
                        title="Add Timestamp">
                        <Icon name="alarm_on" />
                    </div>
                    <div onClick={deleteItem} className="delete" data-bs-toggle="tooltip" data-bs-placement="top" 
                        title="Delete">
                        <Icon name="delete_outline" />
                    </div>

                </div>
            </td>
            </tr>
  )
}
 
export default TableRow;
 
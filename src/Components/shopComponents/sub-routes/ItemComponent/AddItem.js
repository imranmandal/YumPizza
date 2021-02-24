import axios from 'axios';
import React , { useState } from 'react';
import Icon from '../../../iconComponent/Icon'; ;

function AddItem(props) {

    const [data, setData] = useState({
        img: "",
        name: "",
        category: "",
        timed: false,
        from: "",
        to: "",
        status: ""
    })

    function handleChange(e){
        const {name, value} = e.target;
        setData(prevValue => ({...prevValue, [name] : value}))
    }

    function handleTimed(e){
        const name = e.target.name;
        setData(prevValue => ({...prevValue, [name] : !prevValue.timed}));
    }

    function img_pathUrl(input){
        let imgSrc = input.target.files[0].name;
        // console.log(imgSrc);
        setData(prevValue => (
            {...prevValue, img: imgSrc}
        ))
        
    }

    function addItem(){

        // console.log(data.img);
        axios.post(`http://localhost:4000/items`, data)
        .then(res => console.log('Added.'), error=> console.log(error));
        
        setDisplay();
    }

    function setDisplay(){
        props.addItem();
    }

    function imgError(e){
        e.target.src = "http://cdn.onlinewebfonts.com/svg/img_212908.png"
    }

    return (
        <div className="addItem">
            
            <input type="file" id="img" name="itemImage" accept="image/*" onChange={img_pathUrl} hidden />
            <label className="label" htmlFor="img">
                <img onChange={handleChange} name="img" id="img_url" className="addimg" src={data.img} onErrorCapture={imgError} alt="profile" />
            </label>

            <div className="addItemDetail">
                <div className="item-detail">
                    <input onChange={handleChange} value={data.name} type="text" name="name" placeholder="Pizza name" />
                    <select onChange={handleChange} value={data.category} name="category" id="">
                        <option value="">Select Category</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Drinks">Cold drinks</option>
                    </select>
                    <select onChange={handleChange} value={data.status} name="status" id="">
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="non-active">Non Active</option>
                    </select>
                </div>
                
                <div className="addItemToggleBtn">
                    <div className="addTimeItem">
                        <label htmlFor="timed">Timed</label>
                        <label className="switch"> 
                            <input onChange={handleTimed}  value={data.timed} id="timed" type="checkbox" name="timed" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="addTimeItem">
                        <label htmlFor="from">From</label>
                        <input onChange={handleChange} id="from" value={data.from} type="time" name="from" />
                    </div>
                    <div className="addTimeItem">
                        <label htmlFor="to">To</label>
                        <input onChange={handleChange} id="to" value={data.to} type="time" name="to" />
                    </div>
                    <div className="addButton">
                        <button className="btn btn-danger add-item-btn" 
                                onClick={addItem} 
                                id="addButton"
                                data-bs-toggle="tooltip" data-bs-placement="top" 
                                title="Add Item">
                            <Icon name="add_circle" /> &nbsp;
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
)}
 
export default AddItem
 
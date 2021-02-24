import { logDOM } from '@testing-library/react';
import axios from 'axios';
import React, { useState } from 'react';
import TableRow from './TableRow'




function Table(props){

    const { name, filter } = props;
    const [ data, setData ] = useState([])
    
    const route = name;


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
                axios.get(`http://localhost:4000/`+ route)
                .then(res=> 
                    setData(res.data)
                ),
                
                data.map((i, index)=>
                /// filtering which items should appear
                    (
                        
                        filter === "all" ?
                        <TableRow key={i._id}
                            id={i._id} index={index + 1} img={i.imgUrl} name="item"
                            nameValue={i.name} category={i.category} 
                            timed={i.timed} status={i.status} 
                        /> :
                        filter === "active" ? 
                        (i.status === "active" && 
                        <TableRow key={index}
                            id={index + 1} img={i.imgUrl} name="item"
                            nameValue={i.name} category={i.category} 
                            timed={i.timed} status={i.status} 
                        />) : 
                        filter === "non-active" ? 
                        ( i.status === "non-active" &&
                        <TableRow key={index}
                            id={index + 1} img={i.imgUrl} name="item"
                            nameValue={i.name} category={i.category} 
                            timed={i.timed} status={i.status} 
                        />
                        ) :
                        null
                    )
                )
            }
            </tbody>
        </table>
    )
}

export default Table;



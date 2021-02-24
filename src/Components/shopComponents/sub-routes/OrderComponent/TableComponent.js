import React from 'react';

function Table(){
    const item = [
        // {
        //     id:"1",
        //     OCN: 123,
        //     name: "abc",
        //     ODate: "2/3/2020",
        //     OTime: "2.30 pm",
        //     TOrder: 202,
        //     PayStatus: "Paid"
        // },
        // {
        //     id:"2",
        //     OCN: 124,
        //     name: "xyz",
        //     ODate: "2/3/2021",
        //     OTime: "2.30 pm",
        //     TOrder: 203,
        //     PayStatus: "Pending"
        // }
    ]
    

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order Number</th>
                    <th scope="col">Order Confirm Number</th>
                    <th scope="col">Name</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Time</th>
                    <th scope="col">Total Order</th>
                    <th scope="col">Payment Status</th>
                </tr>
            </thead>
            <tbody>
            {
                item.length === 0 ?
                (
                    <tr>
                        <td colSpan="8" style={{color: "grey"}}>No data</td>
                    </tr>
                ) : 
                item.map((i)=>
                   (
                    <tr key={i.id}>
                        <th scope="row">{i.id}</th>
                        {Object.values(i).map((value, index)=>
                            <td key={index}>{value}</td>
                        )}
                    </tr> 
                    )
                )  

                
            }
            </tbody>
        </table>
    )
}

export default Table;


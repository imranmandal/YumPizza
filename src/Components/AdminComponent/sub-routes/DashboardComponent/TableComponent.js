import React from 'react';

function Table(){



    return (<div>
        <table className="table table-striped col-12">
            <tbody>
                <tr>
                <th scope="row">Total Orders</th>
                <td>0</td>
                </tr>
                <tr>
                <th scope="row">Total Sales</th>
                <td>0</td>
                </tr>
                <tr>
                <th scope="row">Pending Orders</th>
                <td>0</td>
                </tr>
                <tr>
                <th scope="row">Delivered Orders</th>
                <td>0</td>
                </tr>
                <tr>
                <th scope="row">Rejected Orders</th>
                <td>0</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

export default Table;
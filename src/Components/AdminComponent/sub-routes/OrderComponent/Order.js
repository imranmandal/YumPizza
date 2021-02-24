import React from 'react';
import SubNav from '../SubNav';
import Heading from './HeadingComponent';
import Filter from './Filter';
import Table from './TableComponent';

function Orders(){
    return <div>
    <SubNav menu={[]} />  
    <div className="orders-container">
        <div className='orders'>
            <Heading title="Orders" />

            <div>
                <Filter btnTxt="ADD ITEM" />
            </div>
            <div className="order-report">
                <div>
                    <h5 className="pending">0</h5>
                    <p>Pending</p>
                </div>
                <div>
                    <h5 className="accepted">0</h5>
                    <p>Accepted</p>
                </div>
                <div>
                    <h5 className="delivered">0</h5>
                    <p>Delivered</p>
                </div>
                <div>
                    <h5 className="rejected">0</h5>
                    <p>Rejected</p>
                </div>
                <div>
                    <h5 className="other">0</h5>
                    <p>Others</p>
                </div>
                <div>
                    <h5 className="totalOrders">0</h5>
                    <p>Total</p>
                </div>
            </div>
            <div>
                <Table />
            </div>
        </div>
    </div>
</div>
}

export default Orders;
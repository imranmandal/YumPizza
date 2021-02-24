import React from 'react';
import SubNav from '../SubNav';
import Heading from './HeadingComponent';
import Filter from './Filter';
import Table from './TableComponent';

function Report(){
    return <div>
    <SubNav menu={[]} />  
    <div className="orders-container">
        <div className='orders'>
            <Heading title="Report" />

            <div>
                <Filter btnTxt="ADD ITEM" />
            </div>
            <div className="reports-report">
                <div>
                    <h5>0</h5>
                    <p>Total Orders</p>
                </div>
                <div>
                    <h5>0</h5>
                    <p>Total Amount</p>
                </div>
            </div>
            <div>
                <Table />
            </div>
        </div>
    </div>
</div>
}

export default Report;
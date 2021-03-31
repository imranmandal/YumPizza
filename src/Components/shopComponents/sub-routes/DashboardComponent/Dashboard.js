import React, { useEffect } from "react";
import SubNav from "../SubNav";
import Table from "./TableComponent";

function Dashboard() {

    useEffect(()=>{
        console.log('hii');
    }, []);
  return (
    <div>
      <SubNav menu={[]} />
      <div className="dashboard-container">
        <div className="dash">
          <div className="dash-cardss">
            <div className="dash-card">
              {/* <span class="material-icons">
                        star_border
                    </span> */}
              <p>Total Orders</p>
              <h3>0</h3>
            </div>
            <div className="dash-card">
              <p>Total Customers</p>
              <h3>0</h3>
            </div>
            <div className="dash-card">
              <p>Total Dishes</p>
              <h3>0</h3>
            </div>
            <div className="dash-card">
              <p>Total Turnover</p>
              <h3>0</h3>
            </div>
          </div>
          <div className="shop-analytics">
            <div>
              <h5>TODAY</h5>
              <p>Thursday, January 12,2021</p>
              <Table />
            </div>
            <div>
              <h5>THIS WEEK</h5>
              <p>Thursday, January 12,2021</p>
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

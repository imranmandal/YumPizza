import React, { useState } from 'react';
import Home from './Components/usersComponents/HomeComponent/Home';
import About from './Components/About';
import Cart from './Components/usersComponents/Cart';
import Account from './Components/usersComponents/Account';
import UserNavbar from './Components/usersComponents/Navbar';
import ShopNavbar from './Components/shopComponents/Navbar';
import Login from './Components/usersComponents/Authentication/Login';
import Register from './Components/usersComponents/Authentication/Register';
import ShopRegister from './Components/shopComponents/Authentication/ShopRegister';
import Test from './Components/testfolder/test';
import Dashboard from './Components/shopComponents/sub-routes/DashboardComponent/Dashboard';
import Setting from './Components/shopComponents/sub-routes/SettingComponent/Setting';
import Items from './Components/shopComponents/sub-routes/ItemComponent/Items';
import Orders from './Components/shopComponents/sub-routes/OrderComponent/Order';
import OrderError from './Components/shopComponents/sub-routes/OrderErrorComponent/OrderError';
import Report from './Components/shopComponents/sub-routes/ReportComponent/Report';
import NotFound from './NotFound';

import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import axios from 'axios';

function App(){

    
    
    const [user, setUser] = useState('');

    function setUserProp(userType){
        // Object.userType.type
        axios.get(`http://localhost:4000/user`)
            .then(res => console.log(res));
        // setUser(userType.type);
        console.log(userType);
    }
    
    return (
    <Router>
        {
            user ? (
                    user==="customer" ?
                        <div>
                            
                            <div><UserNavbar />
                                <Switch>
                                    
                                    <Route path="/" exact component={Home} />
                                    <Route path="/about" component={About} />
                                    <Route path="/account" component={Account} />
                                    <Route path="/cart" component={Cart} />
                                    <Route path="/shop" component={ShopRegister}/>
                                    <Route path="/test" component={Test}/>
                                    
                                    <Route path={"/register" || "/login"} >
                                        <Redirect to="/" />
                                    </Route>
                                    <Route path="/:route" component={NotFound} />
                                </Switch>
                                
                            </div>
                        </div>
                        : user ==="shop" &&
                        <div>
                            <ShopNavbar /> 
                            <div> 
                                <Switch>   
                                        
                                    <Route exact path="/" >
                                        <Redirect to="/dashboard" /> 
                                    </Route>

                                    <Route path="/dashboard" component={Dashboard} />
                                    <Route path="/shop" component={ShopRegister} />
                                    <Route path="/setting" component={Setting} />
                                    <Route path="/items" component={Items}/>
                                    <Route path="/test" component={Test}/>
                                    <Route path="/orders" component={Orders}/>
                                    <Route path="/order_errors" component={OrderError}/>
                                    <Route path="/reports" component={Report}/>
                                    <Route path="/:route" component={NotFound} />
                                </Switch>
                                
                            </div>
                        </div>
            ) :
            (
                <Switch >
                    <Route exact path="/" >
                        <Redirect to="/register" /> 
                    </Route>
                    <Route path="/register">
                        <Register setUser={setUserProp} />
                    </Route>
                    <Route path="/register">
                        <Login setUser={setUserProp} />
                    </Route>
                    <Route path="/:route" >
                        <Redirect to="/" />
                    </Route>

                </Switch>
            )
        }
    </Router>)
}

export default App;


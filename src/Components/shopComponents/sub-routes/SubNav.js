import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../../auth.context/authContext";
import Icon from "../../iconComponent/Icon";


function SubNav(props) {
  const menu = props.menu;
  const history = useHistory()

  const auth = useContext(AuthContext);

  function handleClick(e) {
    props.handleClick(e);
  }

  const logout = () => {
      auth.authDispatch({type: 'logout'});
      history.push('/register');
  };
  return (
    <nav className="dash-nav2">
      <div className="dash-nav2-links">
        <ul>
          {menu.map((link, index) => {
            return (
              <li
                onClick={handleClick}
                className={index === 0 ? "sublis active" : "sublis"}
                key={index}
              >
                {link}
              </li>
            );
          })}
        </ul>

        <span className="account">
          <Icon name="account_circle" />
          <button className="btn btn-warning text-light w-10 logout-btn" onClick={logout}>Logout</button>
        </span>
      </div>
    </nav>
  );
}

export default SubNav;

import { Link } from "react-router-dom";
import { AuthContext } from "../App.js";
import { useContext } from "react";
import { useCookies } from 'react-cookie';
import Constants from "../resources/Constants.js"
import "../style.css";

function Navbar({activeNavBar}) {
  const context = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(['user']);

  return(
    <div className="container-navbar">
      <nav>
        <div>
          <Link to="/">
            <button  
              className={activeNavBar === Constants.DASHBOARD ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {Constants.DASHBOARD}
            </button>
          </Link>
        </div>
        <div>
          <Link to="/cart">
            <button 
              className={activeNavBar === Constants.CART ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {Constants.CART}
            </button>
          </Link>
        </div>
        <div>
          <Link to="/transaction">
            <button 
              className={activeNavBar === Constants.TRANSACTION ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {Constants.TRANSACTION}
            </button>
          </Link>
        </div>
        <div>
          <Link to="/profile">
            <button 
              className={activeNavBar === Constants.PROFILE ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {Constants.PROFILE}
            </button>
          </Link>
        </div>
        {cookies['token'] !== undefined && (
          <div>
            <button
              className="btn-cust btn-non-active-navbar"
              onClick={()=>context.handleLogout(cookies['token'])}
            >
              {Constants.LOGOUT}
            </button>
          </div>
        )}
      </nav>
    </div>
  )
};

export default Navbar;
import { Link } from "react-router-dom";
import { AuthContext } from "../../App.js";
import { useContext } from "react";
import { useCookies } from 'react-cookie';
import Constants from "../../resources/Constants.js";
import "../../style.css";

function Navbar({activeNavBar}) {
  const context = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(['user']);

  return(
    <div className="container-navbar">
      <nav>
        <div>
          <Link to="/admin">
            <button  
              className={activeNavBar === Constants.ADMIN_DASHBOARD ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {Constants.ADMIN_DASHBOARD}
            </button>
          </Link>
        </div>
        <div>
          <Link to="/admin/products">
            <button  
              className={activeNavBar === Constants.ADMIN_PRODUCTS ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {Constants.ADMIN_PRODUCTS}
            </button>
          </Link>
        </div>
        <div>
          <Link to="/admin/users">
            <button  
              className={activeNavBar === Constants.ADMIN_USERS ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {Constants.ADMIN_USERS}
            </button>
          </Link>
        </div>
        <div>
          <Link to="/admin/productanalytic">
            <button  
              className={activeNavBar === Constants.ADMIN_PRODUCT_ANALYTIC ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {Constants.ADMIN_PRODUCT_ANALYTIC}
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
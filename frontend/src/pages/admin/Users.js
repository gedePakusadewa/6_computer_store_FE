import { useState, useEffect, useContext } from "react";
import { useCookies } from 'react-cookie';
import UrlConst from "../../resources/Urls.js";
import Constants from "../../resources/Constants.js";
import axios from "axios";

const Users = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const fetchDataHandler = () => {
    axios({
      method: 'get',
      url: UrlConst.ADMIN_USERS,
      headers: {'Authorization': "Token " + cookies['token']}
    }).then((res) => {
      setUsers(res.data);
    }).catch((err) => {

    })
  }

  const cardHandler = (data) => {
    return(
      <>
        {data.map(item => (
          <div className="cart-product-wrapper">
            <div className="cart-product-title">{item.username}</div>
            <div className="cart-product-delete-btn">
              <button
              >
                {Constants.DETAIL}
              </button>
              <button
              >
                {Constants.UPDATE}
              </button>
              <button
              >
                {Constants.DELETE}
              </button>
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      Users
      <input
        className="search-input-home"
        placeholder="Example: Monitor"
      />
      <button
        className="btn-search-home"
      >
        {Constants.SEARCH}
      </button>
      <br />
      <button
      >
        {Constants.ADMIN_USER_ADD}
      </button>
      {(users !== null && 
          users.length > 0) && (
            cardHandler(users)                
      )}
    </>
  )
}
  
export default Users
import { useState, useEffect, useContext } from "react";
import { useCookies } from 'react-cookie';
import UrlConst from "../../resources/Urls.js";
import Constants from "../../resources/Constants.js";
import axios from "axios";
import ConvertToRupiah from "../../components/ConvertToRupiah.js";

const Products = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchProductHandler();
  }, []);

  const fetchProductHandler = () => {
    axios({
      method: 'get',
      url: UrlConst.ADMIN_PRODUCTS,
      headers: {'Authorization': "Token " + cookies['token']}
    }).then((res) => {
      setProducts(res.data);
    }).catch((err) => {

    })
  }

  const cardHandler = (data) => {
    return(
      <>
        {data.map(item => (
          <div className="cart-product-wrapper">
            <img 
              src={UrlConst.PRODUCT_IMAGE_URI + item.image_url}
            />
            <div className="cart-product-title">{item.name}</div>
            <div>
              <div>
                {ConvertToRupiah(item.price)}
              </div>
            </div>
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
      Products
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
        {Constants.ADMIN_PRODUCT_ADD}
      </button>
      {(products !== null && 
          products.length > 0) && (
            cardHandler(products)                
      )}
    </>
  )
}
  
  export default Products
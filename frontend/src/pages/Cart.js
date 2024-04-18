import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import UrlConst from "../resources/Urls.js";
import GeneralConst from "../resources/General.js";
import ConvertToRupiah from "../components/ConvertToRupiah.js";

const Cart = () => {
  const [cookies, setCookie] = useCookies(['user']);

  const [cartProducts, setCartProducts] = useState(null);

  useEffect(() => {
    fetchAllCartProduct()
  }, []);

  const calculateTotalPriceOrder = (total_item, price) => {
    return total_item * price
  }

  const deleteHandler = (productId) => {
    axios({
      method: 'delete',
      url: UrlConst.CART,
      headers: {'Authorization': "Token " + cookies['token']},
      data: 
        {
          product_id : productId
        }
    }).then((res) => {
      fetchAllCartProduct()
    }).catch((err) => {
      console.log("error in cart product detail")
    })
  }

  const fetchAllCartProduct = () => {
    axios({
      method: 'get',
      url: UrlConst.CART,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setCartProducts(res.data.cart_products)
    }).catch((err) => {
      console.log("error in cart product detail")
    })
  }

  return (
    <>
      {cartProducts === null || cartProducts.length === 0 && (
        <div>
          There is no product here yet
        </div>
      )}
      <div className="cart-product-container">
        <div>
          {(cartProducts !== null && cartProducts.length > 0) && (
            cartProducts.map(item => (
                <div className="cart-product-wrapper">
                  <img 
                    src={UrlConst.PRODUCT_IMAGE_URI + item.image_url}
                  />
                  <div className="cart-product-title">{item.name}</div>
                  <div>
                    <div>{item.total_order} unit</div>
                    <div>
                      {ConvertToRupiah(calculateTotalPriceOrder(item.total_order, item.price))}
                    </div>
                  </div>
                  <div className="cart-product-delete-btn">
                    <button
                      onClick={() => deleteHandler(item.id)}
                    >
                      {GeneralConst.DELETE}
                    </button>
                  </div>
                </div>
            )) 
          )}
        </div>
        <div>
          <div className="cart-total-container">
            <div>
              {GeneralConst.CART_TOTAL_ITEM}
            </div>
            <div>
              3
            </div>
          </div>
          <div className="cart-total-container">
            <div>
              {GeneralConst.CART_TOTAL_PRICE}
            </div>
            <div>
              Rp. 1.000.000, 00
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
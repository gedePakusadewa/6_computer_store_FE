import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import UrlConst from "../resources/Urls.js"
import { useCookies } from 'react-cookie';

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

      {(cartProducts !== null && cartProducts.length > 0) && (
        cartProducts.map(item => (
          <div>
            <div>
              <img 
                src={UrlConst.PRODUCT_IMAGE_URI + "/media/"+ item.image_url}
              />
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.total_order}</div>
              <div>{calculateTotalPriceOrder(item.total_order, item.price)}</div>
              <div>
                <button
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )) 
      )}

    </>
  )
}

export default Cart
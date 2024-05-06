import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UrlConst from "../resources/Urls.js";
import GeneralConst from "../resources/General.js";
import ConvertToRupiah from "../components/ConvertToRupiah.js";
import LoadingBetweenPage from "../components/LoadingBetweenPage.js";

const Cart = () => {
  const [cookies, setCookie] = useCookies(['user']);

  const [cartProducts, setCartProducts] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

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
    setIsloading(true);

    axios({
      method: 'get',
      url: UrlConst.CART,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setCartProducts(res.data.cart_products);
      setIsloading(false);
    }).catch((err) => {
      console.log("error in cart product detail");
      setIsloading(false);
    })
  }

  const checkOutHandler = () => {
    navigate('/payment');
  }

  return (
    <>
      {isLoading && (
        <LoadingBetweenPage />
      )}
      {isLoading === false && 
        (cartProducts === null || 
          cartProducts.length === 0) && (
        <div>
          There is no product here yet
        </div>
      )}
      <div className="cart-product-container">
        <div>
          {isLoading === false && 
            (cartProducts !== null && 
              cartProducts.length > 0) && (
            cartProducts.map(item => (
              <div className="cart-product-wrapper">
                <img 
                  src={UrlConst.PRODUCT_IMAGE_URI + item.image_url}
                />
                <div className="cart-product-title">{item.name}</div>
                <div>
                  <div>{item.total_order} unit</div>
                  <div>
                    {ConvertToRupiah(
                      calculateTotalPriceOrder(item.total_order, item.price))}
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
          <button
            onClick={checkOutHandler}
          >
            {GeneralConst.CART_CHECKOUT}
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
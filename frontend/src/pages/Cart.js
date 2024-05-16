import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UrlConst from "../resources/Urls.js";
import Constants from "../resources/Constants.js";
import ConvertToRupiah from "../components/ConvertToRupiah.js";
import LoadingBetweenPage from "../components/LoadingBetweenPage.js";

const Cart = () => {
  const [cookies, setCookie] = useCookies(['user']);

  const [cartProducts, setCartProducts] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [limitOrder, setLimitOrder] = useState({
    upper:100,
    lower:1
  })
  const [showOrderError, setShowOrderError] = useState(false);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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
      data: { cart_id : productId }
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
      setTotalOrder(res.data.total_order_price.total_order);
      setTotalPrice(res.data.total_order_price.total_price);
    }).catch((err) => {
      console.log("error in cart product detail");
      setIsloading(false);
    })
  }

  const checkOutHandler = () => {
    navigate('/payment');
  }

  const productUnitHandler = (e, id) => {

    if (e.target.value >= limitOrder.lower && 
    e.target.value <= limitOrder.upper){
      // console.log(e.target.value)
      setIsloading(true);

      axios({
        method: 'post',
        url: UrlConst.CART_PRODUCT,
        headers: {'Authorization': "Token " + cookies['token']},
        data: {
          total_order:e.target.value,
          cart_product_id:id
        }
      }).then((res) => {
        fetchAllCartProduct();

        setIsloading(false);
      }).catch((err) => {
        console.log("error in cart product unit");
        setIsloading(false);
      })
    }else{
      setShowOrderError(true);
      fetchAllCartProduct();

      setTimeout(() => setShowOrderError(false), 3000);
    }
  }

  // const updateProductUnit = (productId, totalUnit) => {
    
  // }

  const cartProductHandler = (data) => {
    return(
      <>
        {showOrderError && (
          <>
            <div>{Constants.CART_INVALID_ORDER}</div>
          </>
        )}
        {data.map(item => (
          <div className="cart-product-wrapper">
            <img 
              src={UrlConst.PRODUCT_IMAGE_URI + item.image_url}
            />
            <div className="cart-product-title">{item.name}</div>
            <div>
              <input
                type="number"
                defaultValue={item.total_order}
                // name="total_unit_change"
                onChange={(e) => productUnitHandler(e, item.id_cart)}
              />
              <div>{item.total_order} {Constants.CART_UNIT}</div>
              <div>
                {ConvertToRupiah(
                  calculateTotalPriceOrder(item.total_order, item.price))}
              </div>
            </div>
            <div className="cart-product-delete-btn">
              <button
                onClick={() => deleteHandler(item.id_cart)}
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
      {isLoading && (
        <LoadingBetweenPage />
      )}
      {isLoading === false && 
        (cartProducts === null || 
          cartProducts.length === 0) && (
        <div>{Constants.CART_NO_PRODUCT}</div>
      )}
      <div className="cart-product-container">
        <div>
          {isLoading === false && 
            (cartProducts !== null && 
              cartProducts.length > 0) && (
                cartProductHandler(cartProducts)                
          )}
        </div>
        <div>
          <div className="cart-total-container">
            <div>
              {Constants.CART_TOTAL_ITEM}
            </div>
            <div>{totalOrder}</div>
          </div>
          <div className="cart-total-container">
            <div>
              {Constants.CART_TOTAL_PRICE}
            </div>
            <div>{ConvertToRupiah(totalPrice)}</div>
          </div>
          <button
            onClick={checkOutHandler}
          >
            {Constants.CART_CHECKOUT}
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
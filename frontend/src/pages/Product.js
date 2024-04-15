import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import UrlConst from "../resources/Urls.js";
import GeneralConst from "../resources/General.js";
import ReviewStar from "../components/ReviewStar.js";
import ConvertToRupiah from "../components/ConvertToRupiah.js";

const Product = () => {
  let { id } = useParams();

  const [cookies, setCookie] = useCookies(['user']);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: UrlConst.PRODUCT_DETAIL,
      headers: {'Authorization': "Token " + cookies['token']},
      params: { pk : id}
    }).then((res) => {
      setProduct(res.data.product_detail)
    }).catch((err) => {
      console.log("error in product detail")
    })
  }, [])

  const AddToCartHandler = () => {
    axios({
      method: 'post',
      url: UrlConst.CART,
      headers: {'Authorization': "Token " + cookies['token']},
      data: { 
        product_pk : product.id,
        total_order : 1 
      }
    }).then((res) => {
      // console.log("success")
    }).catch((err) => {
      console.log("error in add to cart")
    })
  }

  return (
    <>
      {product !== null && (
        <div className="product-container">
          <div className="product-img">
            <img
              src={UrlConst.PRODUCT_IMAGE_URI + product.image_url}
            />
          </div>
          <div className="product-description"> 
            <div className="product-description-title">{product.name}</div>
            <div>{ReviewStar(product.star_review)}</div>
            <div>{GeneralConst.PRODUCT_LOREM_IPSUM}</div>
          </div>
          <div>
            <div className="product-buy-wrapper">
              <div className="product-buy-title">Price</div>
              <div>{ConvertToRupiah(product.price)}</div>
            </div>
            <div className="product-buy-wrapper">
              <div className="product-buy-title">Status</div>
              <div>In Stock</div>
            </div>
            <div className="product-buy-wrapper">
              <div className="product-buy-title">Quantity</div>
              <div>7</div>
            </div>
            <div>
              <button
                className="product-buy-button"
                onClick={AddToCartHandler}
              >
                {GeneralConst.PRODUCT_ADD_CART}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Product
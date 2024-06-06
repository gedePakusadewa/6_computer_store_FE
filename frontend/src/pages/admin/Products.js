import { useState, useEffect, useContext } from "react";
import { useCookies } from 'react-cookie';
import UrlConst from "../../resources/Urls.js";
import Constants from "../../resources/Constants.js";
import axios from "axios";
import ConvertToRupiah from "../../components/ConvertToRupiah.js";
import ModalCreateProduct from "../../components/admin/ModalCreateProduct.js";
import ModalDeleteProduct from "../../components/admin/ModalDeleteProduct.js";

const Products = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [products, setProducts] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [productIdDelete, setProductIdDelete] = useState("");


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

  const searchHandler = () => {
    axios({
      method: 'get',
      url: UrlConst.ADMIN_PRODUCTS_SEARCH,
      headers: {'Authorization': "Token " + cookies['token']},
      params:{ keywords: searchInput}
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
                onClick={() => {modalDeleteHandler(item.id)}}
              >
                {Constants.DELETE}
              </button>
            </div>
          </div>
        ))}
      </>
    )
  }

  const modalAddHandler = () => {
    setIsShowModalAdd(true);
  }

  const modalDeleteHandler = (id) => {
    setProductIdDelete(id)
    setIsShowModalDelete(true);
  }

  return (
    <>
      Products
      <input
        className="search-input-home"
        placeholder="Example: Monitor"
        onChange={
          (e) => {setSearchInput(e.target.value)}
        }
      />
      <button
        className="btn-search-home"
        onClick={searchHandler}
      >
        {Constants.SEARCH}
      </button>
      <br />
      <button
        onClick={modalAddHandler}
      >
        {Constants.ADMIN_PRODUCT_ADD}

      </button>
      {(products !== null && 
          products.length > 0) && (
            cardHandler(products)                
      )}
      {isShowModalAdd && (
        <ModalCreateProduct
          setIsShowModalAdd={setIsShowModalAdd}
        />
      )}
      {isShowModalDelete && (
        <ModalDeleteProduct
          productId={productIdDelete}
          setIsShowModalDelete={setIsShowModalDelete}
        />
      )}
    </>
  )
}
  
  export default Products
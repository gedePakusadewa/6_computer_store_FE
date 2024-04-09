import ProductCards from "../components/ProductCards.js";
import UrlConst from "../resources/Urls.js";
import axios from "axios";
import GeneralConst from "../resources/General.js";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

const Dashboard = () =>{
  const [cookies, setCookie] = useCookies(['user']);

  const [products, setProducts] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isEmptySearchResult, setIsEmptySearchResult] = useState(false);

  useEffect(() =>{
    axios({
      method: 'get',
      url: UrlConst.ALL_PRODUCT,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setProducts(res.data)
    }).catch((err) => {
      console.log("error in dashboard")
    })
  }, []);

  const searchHandler = () => {
    axios({
      method: 'get',
      url: UrlConst.PRODUCT_SEARCH,
      headers: {'Authorization': "Token " + cookies['token']},
      params: {
        keywords : searchInput
      }
    }).then((res) => {
      if (res.data.length > 0){
        setProducts(res.data)
      }else{
        setIsEmptySearchResult(true)
        setProducts(null)
      }
    }).catch((err) => {
      console.log("error in search product dashboard")
    })
  }

  return(
    <>  
      <div className="container-search-input">
        <input
          className="search-input-home"
          placeholder="Example: pasta"
          onChange={
            (e) => {setSearchInput(e.target.value)}
          }
        />
        <button
          onClick={searchHandler}
          className="btn-search-home"
        >
          {GeneralConst.SEARCH}
        </button>
      </div>
      {isEmptySearchResult === true && (
        <>
          {GeneralConst.EMPTY_SEARCH
          .replace("{searchInput}", searchInput)}
        </>
      )}
      {products !== null && (
        <ProductCards
          products={products}
        />
      )}
    </>
  )
}

export default Dashboard
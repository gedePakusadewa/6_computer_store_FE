import UrlConst from "../resources/Urls.js";
import Constants from "../resources/Constants.js";
import axios from "axios";
import ConvertToRupiah from "../components/ConvertToRupiah.js";

import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Transaction = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [isLoading, setIsloading] = useState(false);
  const [purchasedData, setPurchasedData] = useState(null);

  useEffect(() => {
    getDataHandler();
  }, []);

  const getDataHandler = () => {
    setIsloading(true);

    axios({
      method: 'get',
      url: UrlConst.PURCHASED,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setIsloading(false);
      setPurchasedData(res.data);
    }).catch((err) => {
      setIsloading(false);
    })
  }

  const loadingComponentHandler = () => {
    return(
      <>
        <div className="profile-wait-message">
          {Constants.TRANSACTION_LOADING}
        </div>
        <div className="profile-wait-message-icon">
          <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
        </div>            
      </>
    )
  }

  const dataComponentHandler = (data) => {   
    return(
      <>
        {data.Data.map(item => (
          <div className="cart-product-wrapper">
            <img 
              src={UrlConst.PRODUCT_IMAGE_URI + item.image_url}
            />
            <div className="cart-product-title">{item.name}</div>
            <div>
              <div>{item.total_unit} unit</div>
              <div>
                {ConvertToRupiah(item.total_price)}
              </div>
            </div>
            <div>{item.created_date}</div>
          </div>
        ))}
      </>
    )      
  }

  return(
    <>
      {isLoading && (
        loadingComponentHandler()
      )}
      {(isLoading === false && purchasedData !== null) && (
        dataComponentHandler(purchasedData)
      )}
    </>
  )
}

export default Transaction
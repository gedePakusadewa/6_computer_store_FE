import Constants from "../resources/Constants.js";
import Urlconst from "../resources/Urls";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

const Payment = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);

  const [isLoading, setIsloading] = useState(false);

  const backToCartHandler = () => {
    navigate("/cart")
  }

  const paymentHandler = () => {
    setIsloading(true);

    axios({
      method: 'post',
      url: Urlconst.PAYMENT,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setIsloading(false);
      navigate("/dashboard");
    }).catch((err) => {
      setIsloading(false);
      console.log("error in payment")
    });
  }

  const loadingComponent = () => {
    return(
      <>
        <div className="profile-wait-message">
          {Constants.PAYMENT_LOADING}
        </div>
        <div className="profile-wait-message-icon">
          <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
        </div>
      </>
    )
  }

  return(
    <>
      {isLoading && (
        loadingComponent()
      )}
      {isLoading === false && (
        <>
          <div>
            {Constants.PAYMENT_DEMO_PAY_DESC}
          </div>
          <button
            onClick={backToCartHandler}
            >
            {Constants.PAYMENT_BTN_BACK_TO_CART}
          </button>
          <button
            onClick={paymentHandler}     
          >
            {Constants.PAYMENT_BTN_PAY}
          </button>
        </>
      )}
    </>
  )
}

export default Payment
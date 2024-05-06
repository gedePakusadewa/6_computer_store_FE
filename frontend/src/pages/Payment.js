import Generalconst from "../resources/General"
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const backToCartHandler = () => {
    navigate("/cart")
  }

  return(
    <>
      <div>
        {Generalconst.PAYMENT_DEMO_PAY_DESC}
      </div>
      <button
        onClick={backToCartHandler}
        >
        {Generalconst.PAYMENT_BTN_BACK_TO_CART}
      </button>
      <button      
        >
        {Generalconst.PAYMENT_BTN_PAY}
      </button>
    </>
  )
}

export default Payment
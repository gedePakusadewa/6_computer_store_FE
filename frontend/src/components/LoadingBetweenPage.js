import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GeneralConst from "../resources/General.js";

const LoadingBetweenPage = () => {
  return(
    <>
      <div className="profile-wait-message">
        {GeneralConst.PROFILE_WAIT_MESSAGE}
      </div>
      <div className="profile-wait-message-icon">
        <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
      </div>
    </>    
  )
}
  
export default LoadingBetweenPage 
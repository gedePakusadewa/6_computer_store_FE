import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Constants from "../resources/Constants.js";

const LoadingBetweenPage = () => {
  return(
    <>
      <div className="profile-wait-message">
        {Constants.PROFILE_WAIT_MESSAGE}
      </div>
      <div className="profile-wait-message-icon">
        <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
      </div>
    </>    
  )
}
  
export default LoadingBetweenPage 
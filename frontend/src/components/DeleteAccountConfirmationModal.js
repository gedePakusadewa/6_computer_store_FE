import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Constants from "../resources/Constants.js";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeleteAccountConfirmationModal = ({
  username,
  setIsShowModalDelete = () => {},
  deleteHandler = () => {}
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const closeHandler = () =>{
    setIsShowModalDelete(false);
  }

  const actionDeleteHandler = () => {
    setIsLoading(true);

    deleteHandler();
  }

  return(
    <>
      <Modal show={true} onHide={closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>
            {Constants.DELETE_ACCOUNT_CONFIRMATION_TITLE}
          </Modal.Title>
        </Modal.Header>
        {isLoading === false && (
          <>
            <Modal.Body>          
              <p>{Constants.DELETE_ACCOUNT_CONFIRMATION_TEXT.replace("{username}", username)}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="danger"
                onClick={actionDeleteHandler}
              >
                {Constants.DELETE_ACCOUNT_YES_BTN}
              </Button>
              <Button 
                variant="secondary"
                onClick={closeHandler}
              >
                {Constants.CLOSE}
              </Button>
            </Modal.Footer>
          </>
        )}
        {isLoading && (
          <Modal.Body>    
          <>
            <div className="profile-wait-message">
              {Constants.PROFILE_DELETE_WAIT}
            </div>
            <div className="profile-wait-message-icon">
              <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
            </div>            
          </>
          </Modal.Body>
        )}
      </Modal>
    </>
  )
}

export default DeleteAccountConfirmationModal
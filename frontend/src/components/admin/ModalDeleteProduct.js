import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Constants from "../../resources/Constants.js";
import axios from "axios";
import UrlConst from "../../resources/Urls.js";
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalDeleteProduct = ({
  productId,
  setIsShowModalDelete = () => {}
}) => {
  const [cookies, setCookie] = useCookies(['user']);
  
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const closeHandler = () => {
    setIsShowModalDelete(false);
  }

  const deleteActionHandler = () => {
    setIsLoadingDelete(true);

    axios({
      method: 'delete',
      url: UrlConst.ADMIN_PRODUCTS,
      headers: {
        'Authorization': "Token " + cookies['token'],
      },
      data : { 'product_id' : productId }
    }).then((res) => {
      setIsLoadingDelete(false);
      closeHandler();
    }).catch((err) => {
      setIsLoadingDelete(false);
    });
  }

  return(
    <>
      <Modal show={true} onHide={closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>
            {Constants.DELETE_ACCOUNT_CONFIRMATION_TITLE}
          </Modal.Title>
        </Modal.Header>
        {isLoadingDelete === false &&(
          <>
            <Modal.Body>
              {Constants.PRODUCT_DELETE_CONFIRMATION_TEXT}
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="danger"
                onClick={deleteActionHandler}
              >
                {Constants.PRODUCT_DELETE_YES_BTN}
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
        {isLoadingDelete === true &&(
          <>
            <Modal.Body>
              <div className="profile-wait-message">
                {Constants.PRODUCT_PLEASE_WAIT_DELETING}
              </div>
              <div className="profile-wait-message-icon">
                <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  )
}

export default ModalDeleteProduct
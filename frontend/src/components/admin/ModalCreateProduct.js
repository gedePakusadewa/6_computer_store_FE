import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Constants from "../../resources/Constants.js";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import UrlConst from "../../resources/Urls.js";
import { useCookies } from 'react-cookie';

const ModalCreateProduct = ({
  setIsShowModalAdd = () => {}
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    'name' : '',
    'price' : 0,
    'quantity' : 0,
    'description' : ''
  });

  const closeHandler = () => {
    setIsShowModalAdd(false);
  }

  const submitFormHandler = (event) => {
    setIsLoadingUpload(true);

    event.preventDefault();

    // mandatory to use FormData for file
    // https://stackoverflow.com/a/43014086
    var formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('image_url', image);
    formData.append('description', form.description)
    formData.append('quantity', form.quantity)

    axios({
      method: 'post',
      url: UrlConst.ADMIN_PRODUCTS,
      headers: {
        'Authorization': "Token " + cookies['token'],
        'Content-Type': 'multipart/form-data'
      },
      data : formData
    }).then((res) => {
      setIsLoadingUpload(false);
      closeHandler();
    }).catch((err) => {
      setIsLoadingUpload(false);
      closeHandler();
    });
  }

  const formChangeHandler = (event) => {
    setForm(previousState =>{
      return { 
        ...previousState,
        [event.target.name]:event.target.value
      }
    });
  }

  const fileChangeHandler = (event) => {
    setImage(event.target.files[0]);
  }

  const formHandler = () => {
    return(
      <>
        <form onSubmit={submitFormHandler}>
          <label>
            {Constants.PRODUCT_INPUT_IMAGE}
            <input 
              type="file"
              name="productImage"
              onChange={(e) => {fileChangeHandler(e)}}
            />
          </label>
          <label>
            {Constants.PRODUCT_INPUT_NAME}
            <input 
              type="text"
              defaultValue={form.name}
              name="name"
              onChange={(e) => {formChangeHandler(e)}}
            />
          </label>
          <label>
            {Constants.PRODUCT_INPUT_PRICE}
            <input 
              type="number"
              name="price"
              defaultValue={form.price}
              onChange={e => {formChangeHandler(e)}}
            />
          </label>
          <label>
            {Constants.PRODUCT_INPUT_QUANTITY}
            <input 
              type="number"
              name="quantity"
              defaultValue={form.quantity}
              onChange={e => {formChangeHandler(e)}}
            />
          </label>
          <label>
            {Constants.PRODUCT_INPUT_DESCRIPTION}
            <br />
            <textarea
              name="description"
              value={form.description}
              onChange={e => {formChangeHandler(e)}}    
            />
          </label>
          <Modal.Footer>
            <input 
            
            type='submit' />
            <Button 
              variant="secondary"
              onClick={closeHandler}
            >
              {Constants.CLOSE}
            </Button>
          </Modal.Footer>
        </form>
      </>
    )
  }

  return(
    <>
      <Modal show={true} onHide={closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>
            {Constants.DELETE_ACCOUNT_CONFIRMATION_TITLE}
          </Modal.Title>
        </Modal.Header>
        {isLoadingUpload === false && (
          <>
            <Modal.Body>
              {formHandler()}
            </Modal.Body>
          </>
        )}
        {isLoadingUpload === true && (
          <>
            <Modal.Body>
              <div>{Constants.PRODUCT_PLEASE_WAIT_UPLOAD}</div>
            </Modal.Body>
          </>          
        )}
      </Modal>
    </>
  )
}

export default ModalCreateProduct
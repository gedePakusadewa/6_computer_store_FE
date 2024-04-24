import UrlConst from "../resources/Urls.js";
import GeneralConst from "../resources/General.js";
import axios from "axios";
import DeleteAccountConfirmationModal from "../components/DeleteAccountConfirmationModal.js";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Profile = () =>{
  const [cookies, setCookie] = useCookies(['user']);

  const [form, setForm] = useState({
    username:"",
    email:""
  });
  const [isShowActionButton, setIsShowActionButton] = useState(true);
  const [isEnableInput, setIsEnableInput] = useState(true);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  useEffect(() =>{
    axios({
      method: 'get',
      url: UrlConst.PROFILE,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setForm({
        username: res.data.user.username,
        email: res.data.user.email
      })
    }).catch((err) => {
      console.log("error in profile")
    })
  }, []);

  const updateHandler = () => {
    setIsShowActionButton(false)
    setIsEnableInput(false)
    
    axios({
      method: 'post',
      url: UrlConst.PROFILE,
      headers: {'Authorization': "Token " + cookies['token']},
      data: {
        username:form.username,
        email:form.email
      }
    }).then((res) => {
      setForm({
        username: res.data.user.username,
        email: res.data.user.email
      })
      setIsShowActionButton(true)
      setIsEnableInput(true)
    }).catch((err) => {
      console.log("error when update profile")
    })
  };

  const onChangeHandler = (e) => {
    setForm(previousState => {
      return {
        ...previousState,
        [e.target.name] : e.target.value
      }
    });
  }

  const modalDeleteHandler = () => {
    setIsShowModalDelete(true)
  }

  const deleteHandler = () => {
    axios({
      method: 'get',
      url: UrlConst.PROFILE,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setForm({
        username: res.data.user.username,
        email: res.data.user.email
      })
    }).catch((err) => {
      console.log("error in profile")
    })
  }

  return(
    <>
      <div className="profile-container">
        <div className="title-profile">{GeneralConst.PROFILE}</div>
        <div>{GeneralConst.USERNAME}</div>
        <div>
          <input 
            className="profile-input"
            defaultValue={form.username}
            name="username"
            // value={profile !== null && (profile.user.username)}
            disabled = {isEnableInput ? "" : "disabled"}
            onChange={(e) => {onChangeHandler(e)}}
          />
        </div>
        <div>{GeneralConst.EMAIL}</div>
        <div>
          <input
            className="profile-input"
            defaultValue={form.email}
            name="email"
            // value={profile !== null && (profile.user.email)}
            disabled = {isEnableInput ? "" : "disabled"}
            onChange={(e) => {onChangeHandler(e)}}
          />
        </div>
        {isShowActionButton && (
          <>
            <button
              className="btn-cust btn-signup btn-login-signup-first-child"
              onClick={updateHandler}
            >
              {GeneralConst.UPDATE}
            </button>
            <button
              className="btn-cust btn-signup btn-login-signup-first-child"
              onClick={modalDeleteHandler}
            >
              {GeneralConst.DELETE}
            </button>
          </>
        )}
        {isShowActionButton === false && (
          <>
            <div className="profile-wait-message">
              {GeneralConst.PROFILE_WAIT_MESSAGE}
            </div>
            <div className="profile-wait-message-icon">
              <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
            </div>            
          </>
        )}        
      </div>
      {isShowModalDelete && (
        <DeleteAccountConfirmationModal
          username={form.username}
          setIsShowModalDelete = {setIsShowModalDelete}
        />
      )}
    </>
  )
}

export default Profile
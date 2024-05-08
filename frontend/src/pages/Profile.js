import UrlConst from "../resources/Urls.js";
import GeneralConst from "../resources/General.js";
import axios from "axios";
import DeleteAccountConfirmationModal 
  from "../components/DeleteAccountConfirmationModal.js";
import LoadingBetweenPage from "../components/LoadingBetweenPage.js";
import { useState, useEffect, useContext } from "react";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from "../App.js";
import { useNavigate } from "react-router-dom";

const Profile = () =>{
  const context = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username:"",
    email:""
  });
  const [isShowActionButton, setIsShowActionButton] = useState(true);
  const [isEnableInput, setIsEnableInput] = useState(true);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDemoUser, setIsDemoUser] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() =>{
    getProfileHandler();

    context.checkUserDemoHandler(cookies['token'], setIsDemoUser);

    if(isDemoUser){
      setIsEnableInput(false);
    }    
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
        username: res.data.User.username,
        email: res.data.User.email
      });
      setIsShowActionButton(true);
      setIsEnableInput(true);
    }).catch((err) => {
      // console.log(err)
      setIsShowActionButton(true);
      setIsEnableInput(true);
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
    setIsShowActionButton(false);

    axios({
      method: 'delete',
      url: UrlConst.PROFILE,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setIsShowActionButton(true);
      removeCookie('token' ,{path:'/'});
      navigate('/login');
    }).catch((err) => {
      setIsShowActionButton(true);
      // console.log("error in profile")
    })
  }

  const getProfileHandler = () => {
    setIsloading(true);

    axios({
      method: 'get',
      url: UrlConst.PROFILE,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setForm({
        username: res.data.User.username,
        email: res.data.User.email
      });
      setIsloading(false);
    }).catch((err) => {
      setIsloading(false);
      // console.log("error in profile")
    });
  }

  return(
    <>
      {isLoading && (
        <LoadingBetweenPage />
      )}

      {isLoading === false && (
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
            {isDemoUser && (
              <div className="profile-disabled-action">
                {GeneralConst.PROFILE_DEMO_DISABLE_MESSAGE}
              </div>
            )}        
            {isShowActionButton && (
              <>
                <button
                  className="btn-cust btn-signup btn-login-signup-first-child"
                  onClick={updateHandler}
                  disabled={isDemoUser ? true : false}
                >
                  {GeneralConst.UPDATE}
                </button>
                <button
                  className="btn-cust btn-signup btn-login-signup-first-child"
                  onClick={modalDeleteHandler}
                  disabled={isDemoUser ? true : false}
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
        </>
      )}
      {isShowModalDelete && (
        <DeleteAccountConfirmationModal
          username = {form.username}
          setIsShowModalDelete = {setIsShowModalDelete}
          deleteHandler = {deleteHandler}
        />
      )}
    </>
  )
}

export default Profile
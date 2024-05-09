import { AuthContext } from "../App.js";
import { useContext, useState } from "react";
import Constants from "../resources/Constants.js";
import "../style.css";

const LogIn = () =>{
  const context = useContext(AuthContext);

  const [form, setForm] = useState({
    username:"",
    password:""
  });
  const [isShowSignUp, setIsShowSignUp] = useState(false);

  const updateForm = (e)  =>{
    setForm(previousState =>{
      return { 
        ...previousState,
        [e.target.name]:e.target.value
      }
    });
  }

  return(
    <div className="login-container-bg">
        <h2 className="login-title">{Constants.TITLE_LOGIN}</h2>
      <div className="login-container">
        <div>
          {context.isErrorInput && (
            <p className="wrong-username-password">{Constants.WRONGINPUTLOGIN}</p>
          )}
          <label htmlFor="title">{Constants.USERNAME}</label><br />
          <input 
            type="text"
            name="username"
            onChange={(e)=>{updateForm(e)}}
          /><br />
          <label htmlFor="title">{Constants.PASSWORD}</label><br />
          <input 
            type="password"
            name="password"
            onChange={(e)=>{updateForm(e)}}
          /><br />
          <button
            className="btn-cust btn-login btn-login-signup-first-child" 
            onClick={()=>context.handleLogin(form.username, form.password)}
          >
            {Constants.LOGIN}
          </button>
          {isShowSignUp && (
            <button
              className="btn-cust btn-signup" 
              onClick={()=>context.handleSignUp()}
            >
              {Constants.SIGNUP}
            </button>
          )}
          <button
            className="btn-cust btn-signup" 
            onClick={()=>context.handleDemoLogin()}
          >
            {Constants.LOGIN_AS_GUEST}
          </button>
        </div>
      </div>
    </div>
  )
}
  
export default LogIn
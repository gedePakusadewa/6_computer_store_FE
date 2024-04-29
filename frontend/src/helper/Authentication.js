import React, { useEffect, useState } from 'react';
import axios from "axios";
import UrlConst from "../resources/Urls.js"

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App.js";
import { useCookies } from 'react-cookie';

const AuthProvider = ({ children }) => {
    const [token, setToken] = React.useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [isErrorInput, setIsErrorInput] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (username, password) => {   
      let isDemo = false;   
      axios.post(UrlConst.LOGIN, {
        username, password, isDemo
      }).
      then((res) => {
        setToken(res.data.token);
        navigate('/');
        setCookie('token', res.data.token, { path: '/' });
        setIsErrorInput(false)
      }).
      catch((res) =>{
        setIsErrorInput(true)
      })
      
      // for fake API
      // var token = await fakeAuth()
      // setToken(token);
      // navigate('/');
      // setCookie('token', token, { path: '/' });
    };

    const handleDemoLogin = async (username, password) => {      
      axios({
        method: 'post',
        url: UrlConst.LOGIN,
        data: 
        {
          isDemo: true
        }
      }).
      then((res) => {
        setToken(res.data.token);
        navigate('/');
        setCookie('token', res.data.token, { path: '/' });
        setIsErrorInput(false)
      }).
      catch((res) =>{
        setIsErrorInput(true)
      })
    };

    const handleSubmitSignUp = async (username, password, email) => {      
      axios.post(UrlConst.SIGNUP, {
        username, password, email
      }).
      then((res) => {
        setToken(res.data.token);
        navigate('/');
        setCookie('token', res.data.token, { path: '/' });
      }).catch((res) =>{
        setIsErrorInput(true)
      })
    };
  
    const handleLogout = (currToken) => {
      // at the time ( 19 january 2024 (UTC+08:00) ), somehow i can 
      // not directly using cookies state into headers
      // next find out why this happen
      axios({
        method: 'delete',
        url: UrlConst.LOGOUT,
        headers: {'Authorization': "Token " + currToken},
      }).then((res) => {
        setToken(null);
        removeCookie('token' ,{path:'/'})
        navigate('/login');
      })

      // setToken(null);
      // removeCookie('token' ,{path:'/'})
      // navigate('/login');
    };
  
    const handleSignUp = () => {
      navigate('/signup');
      setIsErrorInput(false)
    }

    // i think its not suitable to put
    // this function in authentication file but for now
    // let it here
    // TODO find/create new file for this function
    const checkUserDemoHandler = (currToken, setIsDemoUser) => {
      axios({
        method: 'get',
        url: UrlConst.USER_DEMO,
        headers: {'Authorization': "Token " + currToken},
      }).
      then((res) => {
        setIsDemoUser(res.data.data);
      }).
      catch((res) =>{
      })
    }

    const value = {
      token,
      handleLogin,
      handleLogout,
      handleSignUp,
      handleSubmitSignUp,
      handleDemoLogin,
      isErrorInput,
      checkUserDemoHandler
    };

    // fake API
    // const fakeAuth = () =>
    //     new Promise((resolve) => {
    //     setTimeout(() => resolve('2342f2f1d131rf12'), 250);
    // });
    
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthProvider;


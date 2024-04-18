import React from 'react';
import Navbar from "./components/NavBar.js";
import Dashboard from './pages/Dashboard.js';
import Profile from './pages/Profile.js';
import LogIn from './pages/LogIn.js';
import SignUp from './pages/SignUp.js';
import Product from './pages/Product.js';
import Cart from './pages/Cart.js';
import AuthProvider from './helper/Authentication.js';
import ProtectedRoute from './helper/ProtectedRoute.js';
import GeneralConst from "./resources/General.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


export const AuthContext = React.createContext(null);

library.add(fas, far)

function App() {
  return (
    <div className="App-container">
      <BrowserRouter basename='/6_computer_store_FE'>   
        <AuthProvider> 
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Navbar 
                 activeNavBar={GeneralConst.DASHBOARD}
                />
                <Dashboard />
              </ProtectedRoute> 
            }/>
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navbar 
                 activeNavBar={GeneralConst.DASHBOARD}
                />
                <Dashboard />
              </ProtectedRoute> 
            }/>
            <Route path="/profile" element={
              <ProtectedRoute>
                <Navbar 
                 activeNavBar={GeneralConst.PROFILE}
                />
                <Profile />
              </ProtectedRoute> 
            }/>
            <Route path="/product/:id" element={
              <ProtectedRoute>
                <Navbar 
                 activeNavBar={GeneralConst.DASHBOARD}
                />
                <Product />
              </ProtectedRoute> 
            }/>
            <Route path="/cart" element={
              <ProtectedRoute>
                <Navbar 
                 activeNavBar={GeneralConst.CART}
                />
                <Cart />
              </ProtectedRoute> 
            }/>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

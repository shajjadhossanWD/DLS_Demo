import React from 'react';
import {
    Route,
    Routes,
  } from "react-router-dom";
import Dashboard from '../Pages/Dashboard/Dashboard';
import Forgetpassword from '../Pages/Forgetpassword/ForgetPassword';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Otp from '../Pages/Otp/Otp';
import ResetPassword from '../Pages/ResetPassword/ResetPassword';

const Router = () => {
    return (
      <div>
        <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/forgetpassword" element={<Forgetpassword/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
 
        </Routes>
      </div>
    );
};

export default Router;
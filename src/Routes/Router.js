import React from 'react';
import {
    Route,
    Routes,
  } from "react-router-dom";
import Home from '../Pages/Home/Home';

const Router = () => {
    return (
      <div>
        <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home/>}/>
 
        </Routes>
      </div>
    );
};

export default Router;
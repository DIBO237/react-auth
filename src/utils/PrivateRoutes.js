import React,{useContext, useEffect, useState} from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { authContext } from './AuthContext';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const useAuth = () => {
    const tokens = window.localStorage.getItem('token')
    const users = useSelector((state)=>state.user)
    const user = tokens
    //console.log("privateRoute:",user)
    return user;
  };


  
  const PrivateRoutes = () => {
    const isAuth = useAuth();
    //console.log(isAuth)
    return !_.isEmpty(isAuth) ? <Outlet /> : <Navigate to="/login" />;
  };

export default PrivateRoutes
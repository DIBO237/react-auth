import React,{useContext, useEffect, useState} from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { authContext } from './AuthContext';
import _ from 'lodash';

const useAuth = () => {

    const user = window.localStorage.getItem('token')
    //console.log(user)
    return user;
  };

  
  
  
  const PublicRoute = () => {
    const isAuth = useAuth();
   // console.log("PUBLIC",isAuth)
    return _.isEmpty(isAuth) ? <Outlet /> : <Navigate to="/" />;
  };

export default PublicRoute
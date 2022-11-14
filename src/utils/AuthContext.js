import React, { createContext, useState, useEffect } from 'react';
import _ from 'lodash'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { start_loader, stop_loader } from '../Redux/Actions'
import { store_token,get_data } from '../Redux/Reducers';
import { connect } from 'react-redux';
import Headers from '../components/Headers';
import Footer from '../components/Footer';

export const authContext = createContext({});



const AuthProvider = ({ children }) => {
  const store = useSelector((state) => state.token)
  
  const dispatch = useDispatch()
  const [auth, setAuth] = useState({token:null});
  const[userdata,setUserData] = useState({})

  const setAuthData = (data) => {
    setAuth({token: data});
    if(data !== null){
       console.log(data)
       dispatch(store_token(data))
      //  setUserData(dispatch(get_user()))
       window.localStorage.setItem('token',data)

       dispatch(get_data())
       //.log("auth",store)
    }
  };
 

 
 
  useEffect(() => {
     const authToken = window.localStorage.getItem('token')
    if(!_.isEmpty(authToken)){
      console.log("authcontext",authToken)
      setAuth({ token: authToken});
      dispatch(store_token(authToken))
      dispatch(get_data())
      // setUserData(dispatch(get_user()))
      //console.log("auth",store)
      
    }
    
  }, []);

 
//2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false. 
//This function will be executed every time component is mounted (every time the user refresh the page);

 
// 1. when **auth.data** changes we are setting **auth.data** in localStorage with the key 'authData'.

  return (
    <authContext.Provider value={{ auth, setAuthData }}>
      <>
      {auth.token ? <Headers />:<></>}
       
      </>
      {children}
      <>
      {auth.token ? <Footer />:<></>}
       
      </>
    </authContext.Provider>
  );
};



export default AuthProvider;

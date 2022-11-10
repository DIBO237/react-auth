

import React, { useState,useContext } from 'react';

import { Form, Button } from 'react-bootstrap';
import { authContext } from '../utils/AuthContext';
import { Navigate, Outlet,useNavigate,Link } from 'react-router-dom';
import { start_loading , stop_loading} from '../Redux/Reducers'
import { connect } from 'react-redux';
import axios from "axios"
import { success_notify , fail_notify } from "../utils/Utilfunctions"
import _ from 'lodash';

const Login = (props) => {
  const { setAuthData } = useContext(authContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if(_.isEmpty(email)){

      return fail_notify('Email is required',4000)
    }

    if(_.isEmpty(password)){

      return fail_notify('Password is required',4000)
    }

    props.start_loading()
    await axios.post('https://payinsta-api.herokuapp.com/login',{
       username:email,
       password
    }).then((tokens) => {

       const token = tokens.data.response.token
        
         setAuthData(token);
        
          success_notify("Logged in Successfully !",4000)
          props.stop_loading()
          navigate("/");
         
         
         
         
         
         
    }).catch((err) =>{ console.log(err.response.data)
      props.stop_loading()
      fail_notify("Something Went Wrong !",4000)
      navigate("/");
     
    })
    // console.log(email);
    // console.log(password);

 
   
    // we will change it later;
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: 300 }}>
        <h1 className="text-center">Sign in</h1>
        <Form onSubmit={onFormSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <p>Don't have and account ? <Link to="/signup">signup here</Link></p>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3"
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = state =>{
  return{
    load:state.load
  }
  
}

const mapDispatchToProps = dispatch =>{
  return{
    start_loading: ()=> dispatch(start_loading()),
    stop_loading: ()=>dispatch(stop_loading())
  }
  
}



export default connect(mapStateToProps,mapDispatchToProps)(Login);

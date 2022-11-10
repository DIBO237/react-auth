

import React, { useState,useContext } from 'react';

import { Form, Button } from 'react-bootstrap';
import { authContext } from '../utils/AuthContext';
import { Navigate, Outlet,useNavigate ,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from "lodash"
import axios from "axios"
import { start_loading, stop_loading } from '../Redux/Reducers';
import { success_notify , fail_notify } from "../utils/Utilfunctions"

const Signup = () => {
  const { setAuthData } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile,setMobile] = useState("");
  const [confirm_pass,setConfirm_Password]= useState("")
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFormSubmit = async (e) => {
    e.preventDefault(); 

    if(_.isEmpty(name)){

      return fail_notify('Name is required',4000)
    }
    if(_.isEmpty(email)){

      return fail_notify('Email is required',4000)
    }
    if(_.isEmpty(mobile)){

      return fail_notify('Mobile number is required',4000)
    }
    if(_.isEmpty(password)){

      return fail_notify('Password is required',4000)
    }
    if(_.isEmpty(confirm_pass)){

      return fail_notify('Confirm Password is required',4000)
    }
    if(confirm_pass !== password){

      return fail_notify('Confirm password and password mismatched',4000)
    }
    console.log(name,mobile,email,password)
    dispatch(start_loading())
    await axios.post('https://payinsta-api.herokuapp.com/signup',{
       username:email,
       name,
       phone:mobile,
       password,
       confirm_pass
    }).then((tokens) => {

       const token = tokens.data.response.token
        console.log(token)
         setAuthData(token);
         dispatch(stop_loading())
         success_notify('Signed Up successfully !',4000)
         navigate("/");

    }).catch((err) => {
      
      console.log(err.response.data)
      dispatch(stop_loading())
      fail_notify('Something Went Wrong !',4000)
      

    })
    dispatch(stop_loading())
    console.log(email);
    console.log(password);

 
   
    // we will change it later;
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: 300 }}>
        <h1 className="text-center">Sign Up</h1>
        <Form onSubmit={onFormSubmit}>
        <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
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
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Enter Mobile Number"
              onChange={e => {
                setMobile(e.target.value);
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
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={e => {
                setConfirm_Password(e.target.value);
              }}
            />
          </Form.Group>
          <p>Have an account ? <Link to="/login">Login here</Link></p>
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

export default Signup;



import React, { useState,useContext } from 'react';
import "./css/login.css"
import { Form, Button,Col,Row } from 'react-bootstrap';
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
      
      console.log(err.response.data.message)
      dispatch(stop_loading())
      fail_notify(err.response.data.message,4000)
      

    })
    dispatch(stop_loading())
    console.log(email);
    console.log(password);

 
   
    // we will change it later;
  };
  return (

    <div>
    <Row>
      <Col    style={{  height:"900px"  }}>
        <div className="" style={{ backgroundColor: "#00006B" ,padding:10 ,height:"100%" }}>
          <div className="mb-5 text-center" style={{ padding: 50}}>
            <img
              className="img-fluid"
              src="/assets/E-Wallet.gif"
              style={{ width: 300 }}
            />
          </div>
          <div className="text-left mb-5 container header_div"  >
          
              <div>
              <h1 className="head-text" style={{color:"white"}}>Hey,<br></br> Welcome back<br></br>  to Payinstacard!</h1>
              </div>
            
           
            
          </div>
           <div>
             <Row className="">
               <Col md={4} xl={4} lg={4} sm={4} xs={4} className="mb-2">
                <div className="icons-bottom">
                <img src="/assets/img1.png" />
                <p className="mt-2 ml-2" style={{marginLeft:10}}>Secure</p>
                </div>
                  
               </Col>
               <Col md={4} xl={4} lg={4} sm={4} xs={4} className="mb-2">
                <div className="icons-bottom">
                <img src="/assets/img3.png" />
                <p className="mt-2 ml-2" style={{marginLeft:10}}>Instant</p>
                </div>
                  
               </Col>
             
               <Col md={4} xl={4} lg={4} sm={4} xs={4} className="mb-2">
                <div className="icons-bottom">
                <img src="/assets/img2.png" />
                <p className="mt-2" style={{marginLeft:10}}>Simple</p>
                </div>
                  
               </Col>
             

             
               
             </Row>
           </div>
        </div>
      </Col>
      <Col className="formCol "  >
        <div className="loginDiv" style={{}}>
       
        <div className="" >
        <div className="text-center">
             <img className="mb-2" src="/assets/payinsta-logo.png" />
             <div className="headders">
               <h2 className="headders">Signup</h2>
             </div>

          </div>
          <Form onSubmit={onFormSubmit}>
        <Form.Group className='mb-3'>
            <Form.Label className="field-label">Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={e => {
                setName(e.target.value);
              }}
              className="fieldss"
            />
          </Form.Group >
          <Form.Group className='mb-3'>
            <Form.Label className="field-label">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={e => {
                setEmail(e.target.value);
              }}
              className="fieldss"
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className="field-label">Mobile Number</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Enter Mobile Number"
              onChange={e => {
                setMobile(e.target.value);
              }}
              className="fieldss"
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className="field-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              className="fieldss"
            />
          </Form.Group >
          <Form.Group className='mb-3'>
            <Form.Label className="field-label">Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={e => {
                setConfirm_Password(e.target.value);
              }}
              className="fieldss"
            />
          </Form.Group>
          
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3 mb-3"
            style={{backgroundColor:"#00006B" }}
          >
            Sign in
          </Button>
          <p className="bottom-text ">Have an account ? <Link to="/login">Login here</Link></p>
        </Form>
        </div>
        </div>
        
      </Col>
    </Row>
  </div>
   
       
  
  );
};

export default Signup;

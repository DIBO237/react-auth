import React, { useState, useContext } from "react";
import './css/login.css'
import { Form, Button, Row, Col } from "react-bootstrap";
import { authContext } from "../utils/AuthContext";
import { Navigate, Outlet, useNavigate, Link } from "react-router-dom";
import { start_loading, stop_loading } from "../Redux/Reducers";
import { connect } from "react-redux";
import axios from "axios";
import { success_notify, fail_notify } from "../utils/Utilfunctions";
import _ from "lodash";

const Login = (props) => {
  const { setAuthData } = useContext(authContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (_.isEmpty(email)) {
      return fail_notify("Email is required", 4000);
    }

    if (_.isEmpty(password)) {
      return fail_notify("Password is required", 4000);
    }

    props.start_loading();
    await axios
      .post("https://payinsta-api.herokuapp.com/login", {
        username: email,
        password,
      })
      .then((tokens) => {
        const token = tokens.data.response.token;

        setAuthData(token);

        success_notify("Logged in Successfully !", 4000);
        props.stop_loading();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        props.stop_loading();
        fail_notify(err.response.data.message, 4000);
        navigate("/");
      });
    // console.log(email);
    // console.log(password);

    // we will change it later;
  };
  return (
    <div>
      <Row>
        <Col   style={{  height:"900px"  }}>
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
        <Col  className="formCol" >
          <div className="loginDiv" style={{}}>
         
          <div className="" >
          <div className="text-center">
               <img className="mb-2" src="/assets/payinsta-logo.png" />
               <div className="headders">
                 <h2 className="headders">Login</h2>
               </div>

            </div>
            <Form onSubmit={onFormSubmit} style={{maxWidth:600}} >
              <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label className="field-label" >Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}

                  className="fieldss"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="field-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}

                  className="fieldss"
                />
              </Form.Group>
             
              <Button type="submit" className=" w-100 mt-3  mb-3" style={{backgroundColor:"#00006B" }}>
                Sign in
              </Button>
              <p className="bottom-text ">
                Don't have and account ? <Link to="/signup" style={{color:"#00006B;"}}>Create an account</Link>
              </p>
            </Form>
          </div>
          </div>
          
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    load: state.load,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    start_loading: () => dispatch(start_loading()),
    stop_loading: () => dispatch(stop_loading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

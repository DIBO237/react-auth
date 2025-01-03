import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import { useSelector } from "react-redux";
import { success_notify,fail_notify, numberWithCommas } from "../utils/Utilfunctions";
import "./css/products.css"


const Products = () => {
  const formEl = useRef();
  let { name } = useParams();
  const userData = useSelector((state) => state.user);
  const [methodChange, setMethod] = useState(1);
  const [changeform, setForm] = useState(1);
  const [changeButton, setButton] = useState(true);

  const [acNumber, setAcnumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [acName, setAcname] = useState("");

  const [upid, setUpid] = useState("");
  const [upiName, setUpiname] = useState("");
  const [amount, setAmount] = useState("");
  const [convienceFee, setConviencefee] = useState(0);
  const [amtTotal, setTotal] = useState(0);

  let [info, setInfo] = useState({
    name: "",
    mobile: "",
  });
  const [custDetail, setCustdetail] = useState({});

  // HANDLE FORM VALUE CHANGE AND COLLECT
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInfo((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });

    //console.log(Fullname)
  };
 //AMOUNT HANDLER
  const AmountHandle = (e)=>{

    setAmount(e)

    if(!_.isEmpty(e)){
      setConviencefee(((2/ 100) * e).toFixed(2))
      console.log(((2/ 100) * e).toFixed(2))
      let fee = ((2/ 100) * e).toFixed(2)
      
    }
   
    if(_.isEmpty(e)){
      setConviencefee(0)
      setTotal(0)
    }
    
    
  }

  // HANDLE SUBMIT CHANGES HERE
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(info);
    // CHECK IF THE DATA IS VALIDATED OR RETURN ERROR MESSAGE
    if (!checkValidation(info)) {
      return console.log("something Went wrong");
    }
    setForm(2);
  };

  // CHECK VALIDATION HERE IF OK RETURN TRUE ELSE FALSE
  const checkValidation = (data) => {
    let result = true;

    if (!_.isObject(data)) {
      fail_notify("something went wrong ",4000)
      result = false;
    }
    if (_.isEmpty(data.name)) {
      
      result = false;

      fail_notify("Name cannot Empty...",4000)
    }
    if (_.isEmpty(data.mobile)) {
      fail_notify("Mobile number cannot be Empty",4000)
      result = false;
    }

    return result;
  };
  var IFSCreg = new RegExp("^[A-Z]{4}0[A-Z0-9]{6}$");

  // BANK PAYMENT
  const paymentBank = (e) => {
    e.preventDefault();

    if (_.isEmpty(ifsc)) {
      return fail_notify("IFSC code is required !",4000)
    }

    if (!IFSCreg.test(ifsc)) {
      return fail_notify("IFSC code is invalid !",4000)
    }

    if (_.isEmpty(acNumber)) {
      return fail_notify("Account Number required !",4000)
    }

    if (!_.isInteger(parseInt(acNumber))) {
      return fail_notify("Account Number is invalid !",4000)
    }

    if (_.isEmpty(acName)) {
      return fail_notify("Account Holder name required !",4000)
    }

    if (_.isEmpty(amount)) {
      return fail_notify("Please enter amount",4000)
    }

    if (amount < 1) {
      return fail_notify("Amount cannot be less then 1 Rs ",4000)
    }

    if (amount > 49999 ) {
      return fail_notify("Amount cannot be greater then Rs. 49,000",4000)
    }

    let datas = {
      name: info.name,
      phone: info.mobile,
      amount: amount,
      payInfo: {
        acName,
        acNumber,
        ifsc,
      },
    };

    console.log(datas);
    setCustdetail(datas);
    formEl.current.custDetails.value = JSON.stringify(datas);
    console.log("1", formEl.current.custDetails.value);

    if (!_.isEmpty(custDetail)) {
      console.log("2", custDetail);
    }
    formEl.current && formEl.current.submit();
  };

  // UPI PAYMENT
  const paymentUpi = (e) => {
    e.preventDefault();
    var UPIrex = /^[\w.-]+@[\w.-]+$/;
    if (_.isEmpty(upid)) {
      return fail_notify("An UPI id is required !",4000)
    }

    if (!UPIrex.test(upid)) {
      return fail_notify("UPI id invalid ",4000)
    }
    if (_.isEmpty(upiName)) {
      return fail_notify("UPI Holder name required",4000)
    }

    if (_.isEmpty(amount)) {
      return fail_notify("Amount is required !",4000)
    }

    if (amount < 1 ) {
      return fail_notify("Amount cannot be less then 1 Rs  ",4000)
    }
    
    if (amount > 49999 ) {
      return fail_notify("Amount cannot be greater then Rs. 49,000",4000)
    }

    

    let datas = {
      name: info.name,
      phone: info.mobile,
      amount: amount,
      payInfo: {
        upiName,
        upid,
      },
    };

    console.log(datas);
    console.log(datas);
    setCustdetail(datas);
    formEl.current.custDetails.value = JSON.stringify(datas);
    console.log("1", formEl.current.custDetails.value);

    if (!_.isEmpty(custDetail)) {
      console.log("2", custDetail);
    }
    formEl.current && formEl.current.submit();
  };

  const selectPayment = (e) => {
    console.log(e.target.value);

    if (e.target.value === "bank") {
      setMethod(1);
    }
    if (e.target.value === "upi") {
      setMethod(2);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, []);

  return (
    <Container fluid>
      
       
       <Row>
        <Col xl={6} md={6} lg={6} sm={12} xs={12} style={{backgroundColor:"",padding:40}}>
            {/* FRIST FROM STARTS HERE STEP 1 */}
            <div className="forms">
            <h2 className="head-font text-center">{name.toLocaleUpperCase()}</h2>
           

           <div className="mx-auto" style={{maxWidth:500,backgroundColor:"#F8F8FF",borderRadius:10,padding:20}}>

           <div>
             <h3 className="head-font">Enter Details</h3>
           </div>
           
      {changeform === 1 ? (
        <div className="mt-3">
          <Form>
          <Form.Group className="mb-3">
                <Form.Label className="mid-font">Enter Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  placeholder="Enter Your amount"
                  onChange={(e) => AmountHandle(e.target.value)}
                  max={50000}
                  value={amount}
                  className="form-field"
                ></Form.Control>
              </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mid-font">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                onChange={handleChange}
                name="name"
                className="form-field"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mid-font">Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                onChange={handleChange}
                name="mobile"
                className="form-field"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mid-font">Additional Documents {"(optional)"}</Form.Label>
              <diV className="file file-uploads"  >
                <div>
                   <img src="/assets/Group.svg"/>
                  </div>
                  <div>
                    <h5 className="upload-head">Upload Rental agreement</h5>
                    <p className="upload-text-small">Supported formates: JPEG, PNG, PDF, File size no more than 10MB</p>
                  </div>
              <Form.Control className="hide-field" type="file" placeholder="Enter your name" />
              </diV>
              
            </Form.Group>
             <div className="text-center">
             <Button
              
              type="submit"
              onClick={(e) => handleSubmit(e)}
              style={{ backgroundColor:"#00006B"}}
              className="px-5"
            >
              NEXT
            </Button>
             </div>
           
          </Form>
        </div>
      ) : (
        // SECOND FROM STARTS HERE STEP 2
        <div className="mt-5 ">
          {/* RADIO BUTTONS FORM PAYMENT METHOD */}
          <Form.Group className="mx-auto">
            
            <Form.Check
              type="radio"
              aria-label="radio 1"
              inline
              label="Bank Transfer"
              onChange={() => setMethod(1)}
              checked={methodChange === 1}
              className="checksBox"
            />
            <Form.Check
              type="radio"
              aria-label="radio 1"
              inline
              label="UPI Payment"
              onChange={() => setMethod(2)}
              checked={methodChange === 2}
              className="checksBox"
            />
          </Form.Group>

          {/* BANK TRANSFER */}
          <div className="mt-5 ">
            <Form>
              {methodChange === 1 ? (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label className="mid-font">IFSC CODE</Form.Label>
                    <Form.Control
                      type="text"
                      name="ifsc"
                      placeholder="Enter ifsc code"
                      onChange={(e) => setIfsc(e.target.value)}
                      value={ifsc}
                      className="form-field"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="mid-font">A/c Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="acNumber"
                      placeholder="Enter Bank account number"
                      onChange={(e) => setAcnumber(e.target.value)}
                      value={acNumber}
                      className="form-field"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="mid-font">A/c Holder Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="acName"
                      placeholder="Enter Account holder name"
                      onChange={(e) => setAcname(e.target.value)}
                      value={acName}
                      className="form-field"
                    ></Form.Control>
                  </Form.Group>
                </div>
              ) : (
                // UPI TRANSFER
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label className="mid-font">Enter UPI ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="upi-id"
                      placeholder="Enter UPI id here"
                      onChange={(e) => setUpid(e.target.value)}
                      value={upid}
                      className="form-field"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="mid-font">Enter UPI Holder name</Form.Label>
                    <Form.Control
                      type="text"
                      name="upi-id"
                      placeholder="Enter UPI Holder name here"
                      onChange={(e) => setUpiname(e.target.value)}
                      value={upiName}
                      className="form-field"
                    ></Form.Control>
                  </Form.Group>
                </div>
              )}

             
              <div className="text-center"> 
              <Button
                variant="primary px-5"
                type="submit"
                onClick={
                  methodChange === 1
                    ? (e) => paymentBank(e)
                    : (e) => paymentUpi(e)
                }
                style={{ backgroundColor:"#00006B"}}
                className="px-5"
              >
                PAY
              </Button>

              </div>
             
            </Form>
          </div>
        </div>
      )} </div></div>
         
        </Col>
        <Col xl={6} md={6} lg={6} sm={12} xs={12} className="mx-auto" style={{backgroundColor:"",padding:40}}>
          {/* AMOUNT CALCULATION FORM */}
          <div className="amount-bar" style={{maxWidth:500}}>

          
      <div className="" style={{ backgroundColor: " #F8F8FF " ,borderRadius:10 ,padding:10,maxWidth:500}}>
        <h3 className="head-font">Payment Details</h3>
       <div style={{padding:10}}> 
       <div style={{display:"flex", justifyContent:"space-between"}}>
          <div className="mid-font">Amount:</div>
          <div className="mid-font">Rs.{amount ?  parseInt(amount): 0}</div>
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <div className="mid-font">Convinence Fees {'(2%)'}:</div>
          <div className="mid-font">Rs.{convienceFee}</div>
        </div>
        <hr></hr>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <div className="mid-font">Total amount:</div>
          <div className="mid-font">Rs.{amount ? parseInt(convienceFee )+ parseInt(amount): 0}</div>
        </div>

       </div>
        
        {/* <Row className="py-3 px-5">


         
        <Col xs={6} sm={6} md={6} lg={6} className="ml-auto" ><div>Amount:</div></Col>
          <Col xs={6} sm={6} md={6} lg={6}  className="mx-auto">Rs.{amount ?  parseInt(amount): 0}</Col>
          <Col xs={6} sm={6} md={6} lg={6} className="mx-auto">Convinence Fees {'(2%):'}</Col>
          <Col xs={6} sm={6} md={6} lg={6} className="mx-auto">Rs.{convienceFee}</Col>
          <hr className="mt-3"></hr>
          <Col xs={6} sm={6} md={6} lg={6} className="mr-auto">Total amount:</Col>
          <Col xs={6} sm={6} md={6} lg={6} className="mx-auto">Rs.{amount ? parseInt(convienceFee )+ parseInt(amount): 0}</Col>

          
        </Row>
        <div style={{display:"flex", justifyContent:"space-evenly"}}>
          <div>sdsds</div>
          <div>sdsds</div>
        </div> */}
      </div></div>

         
         </Col>
       </Row>
    

       
      <div>
        {userData ? (
          <Form
            className="d-none"
            name="form"
            ref={formEl}
            id="x1"
            method="POST"
            action="https://payinsta-api.herokuapp.com/paynow"
            //action="http://localhost:4000/paynow"
          >
            <input type="text" name="id" value={userData.id}></input>
            <input type="text" name="name" value={userData.name}></input>
            <input type="email" name="email" value={userData.email}></input>
            <input type="text" name="phone" value={userData.mobile}></input>
            <input type="text" name="amount" value={amount ? parseInt(convienceFee )+ parseInt(amount): 1}></input>
            <input type="text" name="custDetails" value={""}></input>
          </Form>
        ) : (
          "loading"
        )}
      </div>
      {/* FORM 1 */}

      {/* FORM 2 */}
    </Container>
  );
};

export default Products;

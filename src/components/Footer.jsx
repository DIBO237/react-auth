import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="page-footer font-small blue pt-4 mt-5" style={{backgroundColor:"#00006B"}}>
    <div className="container text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3 " style={{color:"white"}}>
                <img src='https://payinstacard.com/wp-content/uploads/2022/09/payinstacard-logo-blue_pblue_pblue-1024x1024.jpeg' style={{width:150}}/>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3" style={{color:"white"}}>
                <h5 className="text-uppercase">Policies</h5>
                <ul className="list-unstyled">
                    <li className='mb-2'><a style={{textDecoration:"none", color:"gray"}} href="https://payinstacard.com/terms-conditions/">Terms & Conditions </a></li>
                    <li className='mb-2'><a style={{textDecoration:"none", color:"gray"}} href="https://payinstacard.com/privacy-policy/">Privacy Policy</a></li>
                    <li className='mb-2'><a style={{textDecoration:"none", color:"gray"}} href="https://payinstacard.com/refund-policy/">Refund Policy</a></li>
                    
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3" style={{color:"white"}}>
                <h5 className="text-uppercase">CONTACT DETAILS</h5>
                <p>

               

                GHMC, 5-729, Izzathnagar, w.s. colony, khanamet, serlingampally, beside balaji mens hostel, Hyderabad, Telangana 500084
                </p>
                <p>Phone : <tel>+91 9100420520</tel></p>
                <mail>Email :  info@payinstacard.com</mail>
               
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3 mt-5" style={{color:"white", backgroundColor:"#001eb6"}}>Copyright © 2022 <a href="https://payinstacard.com/" style={{textDecoration:"none",color:"white"}}> Payinstacard</a> Pvt Ltd, All Rights Reserved.
        
    </div>

</footer>
  )
}

import React,{useContext, useEffect, useState} from 'react'
import { authContext } from '../utils/AuthContext'
import {logout} from '../utils/helpers'
import axios from 'axios'
import _ from 'lodash'
import './css/home.css'
import { Button, Container,Row,Col,Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
import { start_loader, stop_loader } from '../Redux/Actions'
// import { get_user } from '../Redux/AuthReducer'
import { FaBuilding,FaShoppingCart,FaArrowRight } from 'react-icons/fa';
import { start_loading , stop_loading,store_token, get_data} from '../Redux/Reducers'

const Home = (props) => {
 const { auth } = useContext(authContext)
 const [user,setUser] = useState({})
  const count = useSelector((state) => state.user)
  // const getToken = useSelector((state) => state.storeToken.value)
  const dispatch = useDispatch()
   const navigate = useNavigate()
  // console.log(dispatch(get_user()))
  
  // props.store_token("Asasasasa")
 useEffect( ()=>{
     
     if(window.localStorage.getItem('token')){
     
      props.get_data()

     }
      
    

  
     
 },[])

 
  return (
   <Container>
     <Row mt={5} gap={4}>
      {/* ________ */}
      <Col sm={12} lg={4} xl={4} md={6} style={{padding:20}}> 
      <Card className='shop-cards' style={{ width: '100%' }}>
        <div className='text-center'>
        <Card.Img  variant="top" src="/assets/thunder 2.svg" style={{width:80}} />
        </div>
     
      <Card.Body className='text-center'>
      
        <Card.Title className='py-2 shop-font'>Home Rent</Card.Title>
       
        <Button style={{backgroundColor:" #00006B"}} variant="primary" onClick={()=>navigate('/product/Home Rent')}>Pay Now <FaArrowRight /> </Button>
      </Card.Body>
    </Card>
      </Col>
       {/* ________ */}
      <Col sm={12} lg={4} xl={4} md={6} style={{padding:20}}> 
      <Card className='shop-rent' style={{ width: '100%' }}>
      <div className='text-center'>
        <Card.Img  variant="top" src="/assets/shop.svg" style={{width:80}} />
        </div>
      <Card.Body className='text-center'>
      
        <Card.Title className='py-2 shop-font'>Shop Rent</Card.Title>
        <Button style={{backgroundColor:" #00006B"}} variant="primary" onClick={()=>navigate('/product/Shop Rent')}>Pay Now <FaArrowRight /> </Button>
        
      </Card.Body>
    </Card>
      </Col>
       {/* ________ */}
      <Col  sm={12} lg={4} xl={4} md={6} className="mx-auto" style={{padding:20}}> 
      <Card className='school-front' style={{ width: '100%' }}>
      <div className='text-center'>
        <Card.Img  variant="top" src="/assets/satellite-dish 2.svg" style={{width:80}} />
        </div>
      <Card.Body className='text-center'>
     
        <Card.Title className='py-2 shop-font'>Education Payment</Card.Title>
       
       
        <Button style={{backgroundColor:" #00006B"}} variant="primary" onClick={()=>navigate('/product/Education Payment')}>Pay Now <FaArrowRight /> </Button>
      </Card.Body>
    </Card>
      </Col>
   
      {/* ________ */}

        {/* ________ */}
        <Col  sm={12} lg={4} xl={4} md={6} style={{padding:20}}> 
      <Card className='society-rent' style={{ width: '100%' }}>
      <div className='text-center'>
        <Card.Img  variant="top" src="/assets/credit-card 2.svg" style={{width:80}} />
        </div>
      <Card.Body className='text-center'>
     
        <Card.Title className='py-2 shop-font'>Society Maintenance</Card.Title>
       
       
        <Button style={{backgroundColor:" #00006B"}} variant="primary" onClick={()=>navigate('/product/Society Maintenance')}>Pay Now <FaArrowRight /> </Button>
      </Card.Body>
    </Card>
      </Col>
   
      {/* ________ */}
       
     </Row>
   </Container>
  )
}

const mapStateToProps = state =>{
  return{
    load:state.load,
    token:state.token,
    user:state.user
  }
  
}

const mapDispatchToProps = dispatch =>{
  return{
    start_loading: ()=> dispatch(start_loading()),
    stop_loading: ()=>dispatch(stop_loading()),
    store_token: (data)=>dispatch(store_token(data)),
    get_data: ()=>dispatch(get_data())
  }
  
}



export default connect(mapStateToProps,mapDispatchToProps)(Home)
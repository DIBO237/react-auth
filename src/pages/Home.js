import React,{useContext, useEffect, useState} from 'react'
import { authContext } from '../utils/AuthContext'
import {logout} from '../utils/helpers'
import axios from 'axios'
import _ from 'lodash'

import { Button, Container,Row,Col,Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
import { start_loader, stop_loader } from '../Redux/Actions'
// import { get_user } from '../Redux/AuthReducer'
import { FaBuilding,FaShoppingCart } from 'react-icons/fa';
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
      <Col sm={12} lg={4} xl={4} md={6} style={{padding:20}}> 
      <Card style={{ width: '100%' }}>
      
      <Card.Body>
      <div className='text-center' style={{borderTop:1}}><FaBuilding size={100} /></div>
        <Card.Title className='py-2'>Home Rent</Card.Title>
       
        <Button variant="primary" onClick={()=>navigate('/product/home')}>Try Now</Button>
      </Card.Body>
    </Card>
      </Col>
      <Col sm={12} lg={4} xl={4} md={6} style={{padding:20}}> 
      <Card style={{ width: '100%' }}>
      
      <Card.Body>
      <div className='text-center' style={{borderTop:1}}><FaShoppingCart size={100} /></div>
        <Card.Title className='py-2'>Shop Rent</Card.Title>
       
        <Button variant="primary" onClick={()=>navigate('/product/Shop')}>Try Now</Button>
      </Card.Body>
    </Card>
      </Col>
      <Col sm={12} lg={4} xl={4} md={6} style={{padding:20}}> 
      <Card style={{ width: '100%' }}>
      
      <Card.Body>
      <div className='text-center' style={{borderTop:1}}><FaBuilding size={100} /></div>
        <Card.Title className='py-2'>Shop Rent</Card.Title>
       
       
        <Button variant="primary" onClick={()=>navigate('/product/home')}>Try Now</Button>
      </Card.Body>
    </Card>
      </Col>
   
     
       
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
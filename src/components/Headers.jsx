import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector,useDispatch } from 'react-redux';
import Avatar from 'react-avatar';
import "../pages/css/header.css"
import { log_out } from '../Redux/Reducers';
import { FaSignOutAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom'

function Headers(props) {
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()


     
  return (
    <Navbar collapseOnSelect expand="lg" bg="light"  className='back' variant="light">
      
        
        <Container>
        <Navbar.Brand href="/"><img src='/assets/payinsta-logo.png ' style={{width:70}} /></Navbar.Brand>
        <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse  id="responsive-navbar-nav">
            
            <Nav className="ms-auto ">
            <Nav.Link href="/" className='headder-font' >Home</Nav.Link>
            <Nav.Link href="/transactions" className='headder-font'>Transactions</Nav.Link>
           
            
          </Nav>
          <Nav >
            <Nav.Link href="#deets">{user ? <Avatar name={user.name} size="39" round={true} /> : "loading"}</Nav.Link>
            <Nav.Link href="#deets" style={{marginTop:5}}>{user ? user.name : "loading"}</Nav.Link>

            <Nav.Link href="#deets">{user ? <div onClick={()=>dispatch(log_out())}><FaSignOutAlt size={35} /></div> : "loading"}</Nav.Link>
            
          </Nav>
         
       
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Headers;
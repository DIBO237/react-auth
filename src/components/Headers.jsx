import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector,useDispatch } from 'react-redux';
import Avatar from 'react-avatar';

import { log_out } from '../Redux/Reducers';

import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom'

function Headers(props) {
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()


     
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      
        
        <Container>
        <Navbar.Brand href="/">Payinstacard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav className="me-auto">
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="transactions">Transactions</Nav.Link>
           
            
          </Nav>
          <Nav>
            <Nav.Link href="#deets">{user ? <Avatar name={user.name} size="39" round={true} /> : "loading"}</Nav.Link>
            <Nav.Link href="#deets">{user ? user.email : "loading"}</Nav.Link>

            <Nav.Link href="#deets">{user ? <Button onClick={()=>dispatch(log_out())}>LOGOUT</Button> : "loading"}</Nav.Link>
            
          </Nav>
         
       
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Headers;
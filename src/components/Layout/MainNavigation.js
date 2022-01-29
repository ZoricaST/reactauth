import { useContext } from 'react';
import { Navbar, Button,Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
 
  
      <Navbar bg="dark" variant="dark">
         <Container fluid>
         <Navbar.Brand as={Link}  to="/">React Auth</Navbar.Brand>
       
  
        

  

    <Nav className="justify-content-end">
          {!isLoggedIn && (
            <Nav.Item >
               <Nav.Link as={Link}  to="/auth">Login</Nav.Link>
            
              </Nav.Item>
          )}

          {isLoggedIn && (
             <Nav.Item>
             <Nav.Link as={Link}  to="/profile">Profile</Nav.Link>
           </Nav.Item>
           
          )}

          {isLoggedIn && (
           
               <Button variant="outline-info"  onClick={logoutHandler}>Logout</Button>
           
           
          )}
          
        </Nav>
        
      
        </Container>
        </Navbar>
       

    

  );
};

export default MainNavigation;
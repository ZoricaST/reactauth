import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
//import classes from './ProfileForm.module.css';
import { Form, Button, Container,Row,Col} from 'react-bootstrap';

const ProfileForm = () => {
  const history = useHistory();
const newPasswordInputRef = useRef();
const authCtx = useContext(AuthContext);

const submitHandler = (event) => {
event.preventDefault();

const enteredNewPassword = newPasswordInputRef.current.value;

// add validation

fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOY-Y4RykiUKME-IVBLrDGGcel9VUpch8', {
method: 'POST',
body: JSON.stringify({
idToken: authCtx.token,
password: enteredNewPassword,
returnSecureToken: false
}),
headers: {
'Content-Type': 'application/json'
}
}).then(res => {
// assumption: Always succeeds!
history.replace('/');
});
};

return (
  
  <Container className=' text-info  border-dark '>
   <Row className="justify-content-center w-1">
    
    <Col xs={8} md={4} className='border rounded' >

      <Form  onSubmit={submitHandler}>

        <Form.Group className="mb-3 font-weight-bold" controlId="formBasicPassword">
            <Form.Label className='text-dark '>New Password</Form.Label>
            <Form.Control type="password" id='new-password'placeholder="Password" minLength="7" ref={newPasswordInputRef}  />  
        </Form.Group>
      
        <Button className='m-2 bg-info border border-dark' variant="primary" type="submit">Submit
        </Button>

      </Form>

    </Col>
    
   </Row>
  
  </Container>

);
};

export default ProfileForm;

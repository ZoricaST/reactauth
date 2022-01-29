import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import { Form, Button, Card, Container, Row, Col} from 'react-bootstrap';

const AuthForm = () => {
const history = useHistory();
const emailInputRef = useRef();
const passwordInputRef = useRef();

const authCtx = useContext(AuthContext);

const [isLogin, setIsLogin] = useState(true);
const [isLoading, setIsLoading] = useState(false);

const switchAuthModeHandler = () => {
setIsLogin((prevState) => !prevState);
};

const submitHandler = (event) => {
event.preventDefault();

const enteredEmail = emailInputRef.current.value;
const enteredPassword = passwordInputRef.current.value;

// optional: Add validation

setIsLoading(true);
let url;
if (isLogin) {
url =
'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOY-Y4RykiUKME-IVBLrDGGcel9VUpch8';
} else {
url =
'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOY-Y4RykiUKME-IVBLrDGGcel9VUpch8';
}
fetch(url, {
method: 'POST',
body: JSON.stringify({
email: enteredEmail,
password: enteredPassword,
returnSecureToken: true,
}),
headers: {
'Content-Type': 'application/json',
},
})
.then((res) => {
setIsLoading(false);
if (res.ok) {
return res.json();
} else {
return res.json().then((data) => {
let errorMessage = 'Authentication failed!';
// if (data && data.error && data.error.message) {
// errorMessage = data.error.message;
// }

throw new Error(errorMessage);
});
}
})
.then((data) => {
authCtx.login(data.idToken);
history.replace('/');
})
.catch((err) => {
alert(err.message);
});
};

return (
  
  <Container className=' text-info mt-2 border-dark my-auto'>
    <Card>
   <Row className="justify-content-center  w-1">
    
    <Col xs={8} md={4} className='border rounded' >
    <h1 className='text-center'>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <Form  onSubmit={submitHandler}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"id='email' required ref={emailInputRef} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

    


      <Form.Group className="mb-3 font-weight-bold" controlId="formBasicPassword">
            <Form.Label >Your Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password" 
            minLength="7" 
            id='password'
            required
            ref={passwordInputRef} />  
        </Form.Group>

<div className={classes.actions}>
{!isLoading && (
<button>{isLogin ? 'Login' : 'Create Account'}</button>
)}
{isLoading && <p>Sending request...</p>}

<Button
type='button'
className={classes.toggle}
onClick={switchAuthModeHandler}
>
{isLogin ? 'Create new account' : 'Login with existing account'}
</Button>
</div>

      </Form>

    </Col>
    
   </Row>
  </Card>
  </Container>


);
};

export default AuthForm;
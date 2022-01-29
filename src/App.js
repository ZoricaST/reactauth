import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {
  //BrowserRouter as Router,
  Route,
 // Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";


import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import NotFound from './components/NotFound';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
      
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path="*">
            <NoMatch />
          </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

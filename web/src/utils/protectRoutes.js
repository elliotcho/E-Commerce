import decode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
  
    try { 
      decode(token);
      decode(refreshToken);
    } catch (err){
      return false;
    }
  
    return true;
}
  
 const isAdmin = () => {
    let result = false;
  
    try { 
      const token = localStorage.getItem('token');
      const { user } = decode(token);
  
      result = user.isAdmin;
    } catch (err) {
        return false;     
    }
  
    return result;
}
  
export const UnauthenticatedRoute = ({component: Component, ...rest}) => (
    <Route
      {...rest}
      render = {props =>
        (!isAuthenticated() ? (
            <Component {...props} />
          ) :
          <Redirect
             to = {{
                pathname: '/'
             }}
          />  
        )
      }
    />
);
  
export const AuthenticatedRoute = ({component: Component, ...rest}) => (
    <Route
      {...rest}
      render = {props =>
        (isAuthenticated() ? (
            <Component {...props} />
          ) :
          <Redirect
             to = {{
                pathname: '/login'
             }}
          />  
        )
      }
    />
);
  
export const AdminRoute = ({component: Component, ...rest}) => (
    <Route
      {...rest}
      render = {props =>
        (isAuthenticated() && isAdmin() ? (
            <Component {...props} />
          ) : <Redirect
              to = {{
                 pathname: '/'
              }}
          />
        )
      }
     />
);
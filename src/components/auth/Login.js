import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Style from './Login.css';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const clientId = process.env.REACT_APP_CLIENT_ID;

const Login = () => {

  const navigate = useNavigate();

  const onSuccess = (res) => {
    
    const curr_user = jwt_decode(res.credential);
    console.log("LOGIN SUCCESS! User: ", res);
    console.log("Decoded: ", curr_user);

    localStorage.setItem('user', JSON.stringify(curr_user));

    navigate('/');
  } 

  const onFailure = (res) => {
    console.log("LOGIN Failed! res: ", res);
  }


  return (
    <div id="signInButton">
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={onSuccess}
          onFailure={onFailure} 
          cookiePolicy="single_host_origin"
        />
      </GoogleOAuthProvider>
    </div>
  );
} 

export default Login;
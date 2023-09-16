import { useContext } from "react";
import GoogleButton from "react-google-button";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import Styles from './Authenticate.css';


const GoogleAuth = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSign = async (event) => {
    event.preventDefault();

    try {
      const res = await ctx.googleSignIn();
      console.log('google', res);
      localStorage.setItem('token', res.user.accessToken);
      
      navigate("/home");

    } catch (err) {
      console.log(err.message);
    }

  }

  return (
    <div className="button-google">
      <GoogleButton className="g-btn" type='dark' onClick={handleGoogleSign} />
    </div>
  );
}

export default GoogleAuth;
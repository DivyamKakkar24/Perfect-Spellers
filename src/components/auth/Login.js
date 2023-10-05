import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../ui/Copyright';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import GoogleAuth from './GoogleAuth';
import ReCAPTCHA from 'react-google-recaptcha';
import Styles from './Authenticate.css';
import { useDispatch } from 'react-redux';
import { tabsActions } from '../../store/tabs';


const defaultTheme = createTheme();

const Login = () => {
  const ctx = React.useContext(AuthContext);
  const [error, setError] = React.useState("");
  const [verified, setVerified] = React.useState(false);

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const e = emailRef.current.value;
    const p = passwordRef.current.value;

    try {
      const res =await ctx.onLogIn(e, p);
      // console.log(res);

      localStorage.setItem('token', res.user.accessToken);
      
      dispatch(tabsActions.refreshTabs());
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const recaptchaOnChange = (value) => {
    // console.log('Captcha value: ', value);
    setVerified(true);
  }


  return(
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#C62925' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Log in
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />

            <div className='recaptcha'>
              <ReCAPTCHA
                sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                onChange={recaptchaOnChange}
                className='g-captcha'
              />
            </div>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              disabled={!verified}
            >
              Sign In
            </Button>

            <Grid container sx={{ mb: 2 }}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="?mode=signup" variant="body2">
                  {/* <L to='?mode=signup' className='link'>
                    {"Don't have an account? Sign Up"}
                  </L> */}
                  Not a member? Register now
                </Link>
              </Grid>
            </Grid>
            <hr />
            
            <GoogleAuth />
          </Box>
        </Box>
        
        <Copyright sx={{ mt: 3 }} />
      </Container>
    </ThemeProvider>
  )
};

export default Login;
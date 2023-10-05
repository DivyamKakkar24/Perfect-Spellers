import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../ui/Copyright';
import AuthContext from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import ReCAPTCHA from 'react-google-recaptcha';
import Styles from './Authenticate.css';
import { useDispatch } from 'react-redux';
import { tabsActions } from '../../store/tabs';


const defaultTheme = createTheme();

const SignUp = () => {
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
      const res = await ctx.onSignUp(e, p);
      console.log(res);
      
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


  return (
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
          <Avatar sx={{ m: 1, bgcolor: '#3C03D1' }}>
            <LockPersonOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          
          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={passwordRef}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            
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
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
              <Grid item>
                <Link href="?mode=login" variant="body2">
                  Already have an account? Sign in
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

export default SignUp;
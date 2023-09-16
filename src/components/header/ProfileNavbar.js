import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './Navbar.css';
import AuthContext from '../../context/auth-context';

const ProfileNavbar = () => {
  const ctx = useContext(AuthContext);

  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      await ctx.onLogOut();
      
      localStorage.removeItem('token');
      navigate("/");
      
    } catch(err) {
      console.log(err.message);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#191919' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, paddingLeft: 1 }}>
            <Link className='a' to = "/">Spelling App Demo</Link>
          </Typography>

          <Typography variant="subtitle1" gutterBottom color={'#A9FCF1'} sx={{mr: 8}}>
            {ctx.user.email}
          </Typography>

          <Button variant='contained' endIcon={<LogoutIcon />} onClick={logoutHandle}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ProfileNavbar;
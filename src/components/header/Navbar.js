import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Styles from './Navbar.css';


const Navbar = () => {

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

          <Link className='a' to = "/auth?mode=login">
            <Button variant='contained' sx={{background: '#79D2F0', color: '#000000'}}>
              Login
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Styles from './Navbar.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Navbar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pages = ['Products', 'Pricing', 'Blog'];


  const loginButtonHandle = async () => {
    navigate('/auth?mode=login');
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#191919' }}>
        <Toolbar>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, paddingLeft: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link className='a' href="/">Perfect Spellers</Link>
          </Typography>
          
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ flexGrow: 1, paddingLeft: 1, display: { xs: 'none', md: 'flex' } }}
          >
            <Link className='a' href="/">Perfect Spellers</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 3, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Button 
            variant='contained' 
            sx={{
              background: '#ccf4fe', 
              color: '#000000', 
              "&:hover": {backgroundColor: "#a9e1fd" },
              borderRadius: 16
            }}
            onClick={loginButtonHandle}
          >
            Login
          </Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
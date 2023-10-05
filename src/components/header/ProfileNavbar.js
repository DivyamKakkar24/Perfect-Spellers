import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Styles from './Navbar.css';
import AuthContext from '../../context/auth-context';
import { useDispatch } from 'react-redux';
import { tabsActions } from '../../store/tabs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const ProfileNavbar = () => {
  const ctx = useContext(AuthContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const pages = ['Products', 'Pricing', 'Blog'];

  const logoutHandle = async () => {
    try {
      await ctx.onLogOut();
      
      localStorage.removeItem('token');
      
      dispatch(tabsActions.refreshTabs());
      navigate("/");
    } catch(err) {
      console.log(err.message);
    }
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
            <Link className='a' href="/">Spelling App Demo</Link>
          </Typography>
          
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ flexGrow: 1, paddingLeft: 1, display: { xs: 'none', md: 'flex' } }}
          >
            <Link className='a' href="/">Spelling App Demo</Link>
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
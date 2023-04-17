import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axiosConfig";
import TokenContext from '../../TokenContext';

export default function NavBar(props) {
  const { removeToken } = props
  const { token } = useContext(TokenContext)

  const pages = ['Products', 'Pricing', 'Blog'];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  let navigate = useNavigate();

  const handleNavigate = id => {
    navigate("/")
  }

  const handleHomeNavigate = id => {
    navigate("/home")
  }

  const handleNavigateLogin = () => {
    navigate("/signIn")
  }

  const handleLogout = async () => {
    try {
      const res = await api({
        method: "POST",
        url: "/logout"
      })
      if (res.status === 200){
        removeToken()
        navigate("/")
      }
    } catch(error){
      console.log(error)
    }
    
  }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            color='secondary'
            
          >
            <MenuIcon />
          </IconButton>
          {
            !token && token!=="" &&token!== undefined ? 
            <Typography onClick={() => handleNavigate()} variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }} color='secondary'>
              WorkWins
            </Typography>
            :
            <Typography onClick={() => handleHomeNavigate()} variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }} color='secondary'>
              WorkWins
            </Typography>
          }

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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color='secondary'>{page}</Typography>
                </MenuItem>
              ))}
          </Menu>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          

          {
            !token && token!=="" &&token!== undefined ? 
            <Button onClick={() => handleNavigateLogin()} color="inherit">Sign In</Button>
            :
            <Button onClick={() => handleLogout()} color="inherit">Sign Out</Button>
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
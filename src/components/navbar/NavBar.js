import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function NavBar(props) {
  const {token, removeToken } = props
  
  let navigate = useNavigate();

  const handleNavigate = id => {
    navigate("/home")
  }

  const handleNavigateLogin = () => {
    navigate("/login")
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
          <Typography onClick={() => handleNavigate()} variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }} color='secondary'>
            CareerWins
          </Typography>
          {
            !token && token!=="" &&token!== undefined ? 
            <Button onClick={() => handleNavigateLogin()} color="inherit">Login</Button>
            :
            <Button onClick={() => removeToken()} color="inherit">Logout</Button>
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
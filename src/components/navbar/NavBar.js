import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axiosConfig";
import TokenContext from '../../TokenContext';

export default function NavBar(props) {
  const { removeToken } = props
  const { token } = useContext(TokenContext)
  
  let navigate = useNavigate();

  const handleNavigate = id => {
    navigate("/home")
  }

  const handleNavigateLogin = () => {
    navigate("/login")
  }

  const handleLogout = async () => {
    try {
      const res = await api({
        method: "POST",
        url: "/logout"
      })
    } catch(error){
      console.log(error)
    }
    removeToken()
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
            <Button onClick={() => handleLogout()} color="inherit">Logout</Button>
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
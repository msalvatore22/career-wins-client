import React from 'react'
import { Typography, Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  let navigate = useNavigate()
  
  const handleSignUpClick = () => {
    navigate("/signUp")
  }

  const handleSignInClick = () => {
    navigate("/signIn")
  }

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh'}}>
      <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        <Typography variant="h3" gutterBottom>
          Track your career achievements
        </Typography>
        <Typography color="secondary" variant="h3" gutterBottom>with WorkWins.</Typography>
        <Typography variant="h6" gutterBottom>
          Take control of your career today.
        </Typography>
      </Box>
      <Box 
        sx={{
          marginTop: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button sx={{marginRight: 2}} variant="contained" color="secondary" onClick={() => handleSignUpClick()}>Sign Up</Button>
        <Button variant="outlined" color="secondary" onClick={() => handleSignInClick()}>Sign In</Button>
      </Box>
    </Container>
  )
}

export default Landing
import React from 'react'
import { useNavigate } from 'react-router-dom';
import WinList from '../../components/winList/WinList';
import { Button } from '@mui/material';

const Home = () => {
  let navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/wins/create")
  }
  
  return (
    <div style={{textAlign: 'center'}} >
      <Button style={{margin: '30px 0'}} variant="contained" onClick={() => handleCreateClick()}>Create</Button>
      <WinList></WinList>
    </div>
  )
}

export default Home;
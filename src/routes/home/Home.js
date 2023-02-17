import React from 'react'
import WinList from '../../components/winList/WinList';
import { Button } from '@mui/material';

const Home = () => {
  return (
    <div style={{textAlign: 'center'}} >
      <Button style={{margin: '30px 0'}} variant="contained">Create</Button>
      <WinList></WinList>
    </div>
  )
}

export default Home;
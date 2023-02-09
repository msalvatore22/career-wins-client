import React from 'react'
import WinList from '../winList/WinList';

const Home = ({wins}) => {
  return (
    <div>
      <WinList wins={wins}></WinList>
    </div>
  )
}

export default Home;
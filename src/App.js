import './App.css';
import api from './api/axiosConfig';

import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';

import WinContext from "./WinContext";

import Layout from './components/Layout';
import Home from './routes/home/Home';
import NotFound from './components/notFound/NotFound';
import WinDetail from './routes/winDetail/WinDetail';



function App() {
  const [wins, setWins] = useState([]);
  const [selectedWin, setSelectedWin] = useState();

  const getWins = async () => {
    try {
      const response = await api.get("/wins")
      setWins(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWins()
  }, [])
  
  return (
    <WinContext.Provider
      value={{
        wins,
        setWins,
        selectedWin,
        setSelectedWin
      }}
    >
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />}></Route>
          <Route path="wins/:id" element={<WinDetail />}></Route>
          <Route path="*" element = {<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
    </WinContext.Provider>
  );
}

export default App;

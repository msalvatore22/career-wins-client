import './App.css';
import api from './api/axiosConfig';
import { ThemeProvider} from '@mui/material/styles';
import theme from './Theme'

import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';

import WinContext from "./WinContext";

import Layout from './components/Layout';
import Home from './routes/home/Home';
import NotFound from './components/notFound/NotFound';
import WinDetail from './routes/winDetail/WinDetail';
import NavBar from './components/navbar/NavBar';
import WinCreateForm from './routes/form/WinForm';
import WinEditForm from './routes/form/WinEditForm';

function App() {
  
  const [wins, setWins] = useState([]);

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
    <ThemeProvider theme={theme}>
    <WinContext.Provider
      value={{
        wins,
        setWins
      }}
    >
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />}></Route>
          <Route path="wins/:id" element={<WinDetail />}></Route>
          <Route path="wins/create" element={<WinCreateForm />}></Route>
          <Route path="wins/edit/:id" element={<WinEditForm />}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
    </WinContext.Provider>
    </ThemeProvider>
  );
}

export default App;

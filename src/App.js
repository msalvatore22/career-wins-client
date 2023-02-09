import './App.css';
import api from './api/axiosConfig';

import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/home/Home';
import NotFound from './components/notFound/NotFound';


function App() {
  const [wins, setWins] = useState([]);
  const [win, setWin] = useState();

  const getWins = async () => {
    try {
      const response = await api.get("/api/v1/wins")
      setWins(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWins()
  }, [])
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home wins={wins} />}></Route>

          <Route path="*" element = {<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

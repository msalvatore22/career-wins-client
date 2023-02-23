import './App.css';
import { ThemeProvider} from '@mui/material/styles';
import theme from './Theme'
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/home/Home';
import NotFound from './components/notFound/NotFound';
import WinDetail from './routes/winDetail/WinDetail';
import NavBar from './components/navbar/NavBar';
import WinForm from './routes/form/WinForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />}></Route>
          <Route path="wins/:id" element={<WinDetail />}></Route>
          <Route path="wins/create" element={<WinForm />}></Route>
          <Route path="wins/edit/:id" element={<WinForm />}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;

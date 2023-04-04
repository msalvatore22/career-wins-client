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
import SignUp from './routes/signUp/SignUp';
import SignIn from './routes/signIn/SignIn';
import useToken from './hooks/useToken';
import TokenContext from './TokenContext';

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <TokenContext.Provider value={{token}}>
    <ThemeProvider theme={theme}>
    <div className="App">
      <NavBar removeToken={removeToken} ></NavBar>
      <Routes>
        <Route path="/" element={<Layout />} >
          {
            !token && token!=="" &&token!== undefined ? 
            <>
              <Route path="/signup" element={<SignUp setToken={setToken} />}></Route>
              <Route path="/login" element={<SignIn setToken={setToken} />}></Route> 
            </>
            : 
            (
              <>
                <Route path="/home" element={<Home />}></Route>
                <Route path="wins/:id" element={<WinDetail />}></Route>
                <Route path="wins/create" element={<WinForm />}></Route>
                <Route path="wins/edit/:id" element={<WinForm />}></Route>
                <Route path="*" element={<NotFound/>}></Route>
              </>
            )
          }
        </Route>
      </Routes>
    </div>
    </ThemeProvider>
    </TokenContext.Provider>
  );
}

export default App;

import './App.css';
import { ThemeProvider} from '@mui/material/styles';
import theme from './Theme'
import {Routes, Route} from 'react-router-dom';
import Home from './routes/home/Home';
import NotFound from './components/notFound/NotFound';
import WinDetail from './routes/winDetail/WinDetail';
import NavBar from './components/navbar/NavBar';
import NavBar2 from './components/navbar/NavBar2';
import WinForm from './routes/form/WinForm';
import SignUp from './routes/signUp/SignUp';
import SignIn from './routes/signIn/SignIn';
import Landing from './routes/landing/Landing';
import useToken from './hooks/useToken';
import TokenContext from './TokenContext';
import WinList from './components/winList/WinList';

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <TokenContext.Provider value={{token}}>
    <ThemeProvider theme={theme}>
    <div className="App">
      <NavBar2 removeToken={removeToken} ></NavBar2>
      
      <Routes>
        
          {
            !token && token!=="" &&token!== undefined ? 
            <>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/signUp" element={<SignUp setToken={setToken} />}></Route>
              <Route path="/signIn" element={<SignIn setToken={setToken} />}></Route> 
            </>
            : 
            (
              <>
                <Route path="/wins" element={<WinList />}></Route>
                <Route path="wins/:id" element={<WinDetail />}></Route>
                <Route path="wins/create" element={<WinForm />}></Route>
                <Route path="wins/edit/:id" element={<WinForm />}></Route>
                <Route path="*" element={<NotFound/>}></Route>
              </>
            )
          }
        
      </Routes>
    </div>
    </ThemeProvider>
    </TokenContext.Provider>
  );
}

export default App;

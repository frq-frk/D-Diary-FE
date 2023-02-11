import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import ResponsiveAppBar from './components/appbar/ResponsiveAppbar';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './theme/CustomTheme'
import CustomFooter from './components/footer/CustomFooter';
import TodayEntry from './pages/diary/TodayEntry';
import PastEntries from './pages/diary/PastEntries';


function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <div className="App">
          <ResponsiveAppBar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            {/* <Route path='/pageflip' element={<PageFlip />}></Route> */}
            <Route path='/entry' element={<TodayEntry />}></Route>
            <Route path='/pastentries' element={<PastEntries />}></Route>
          </Routes>
          {/* <CustomFooter /> */}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

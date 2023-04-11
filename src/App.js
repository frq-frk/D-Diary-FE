import './App.css';
import { BrowserRouter, } from 'react-router-dom'
import ResponsiveAppBar from './components/appbar/ResponsiveAppbar';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './theme/CustomTheme'
import AppRoutes from './routes/App.route'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <div className="App">
          <ResponsiveAppBar />
          <AppRoutes />
        </div>
        <ToastContainer autoClose={5000} hideProgressBar={true} pauseOnHover={false}/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

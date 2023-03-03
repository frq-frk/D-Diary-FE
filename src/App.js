import './App.css';
import { BrowserRouter,} from 'react-router-dom'
import ResponsiveAppBar from './components/appbar/ResponsiveAppbar';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './theme/CustomTheme'
import AppRoutes from './routes/App.route'


function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <div className="App">
          <ResponsiveAppBar/>
         <AppRoutes/>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

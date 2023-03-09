import { Cars } from './Cars';
import './App.css';
import NavBar from './Components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7d1e1e',
    },
    secondary: {
      main: '#6b5656',
    },
    background: {
      default: '#2a373f',
      paper: '#bcaaa4',
    },
    text: {
      primary: 'rgba(63,53,53,0.87)',
      secondary: 'rgba(65,56,56,0.87)',
      disabled: 'rgba(49,46,46,0.87)',
    },
  },
});

function App() {
  return (<>
  <ThemeProvider theme={theme}>
    <NavBar/>
    <Cars/>
  </ThemeProvider>
 </>
  );
}

export default App;

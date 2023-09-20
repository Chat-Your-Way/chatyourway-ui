import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
import lightTheme from './ui-kit/theme/theme';
import './App.css';
import Login from './pages/Login';
import SuccessSignup from './pages/SuccessSignup';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Typography variant="h1">hello world!</Typography>
      <Login />
      <SuccessSignup />
    </ThemeProvider>
  );
}

export default App;

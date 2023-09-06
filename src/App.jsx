import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from './ui-kit/theme/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Typography variant="h1">hello world!</Typography>
    </ThemeProvider>
  );
}

export default App;

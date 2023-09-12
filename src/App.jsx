import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
import lightTheme from './ui-kit/theme/theme';
import './App.css';
import Avatar from './ui-kit/components/Avatar/Avatar';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Typography variant="h1">hello world!</Typography>
      <Avatar>AB</Avatar>
    </ThemeProvider>
  );
}

export default App;

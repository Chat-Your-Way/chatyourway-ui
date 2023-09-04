import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
import lightTheme from './ui-kit/theme/theme';
import './App.css';
import SearchInput from './ui-kit/components/Input/SearchInput/SearchInput';
import EmailInput from './ui-kit/components/Input/EmailInput/EmailInput';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Typography variant="h1">hello world!</Typography>
      <EmailInput />
      <SearchInput />
    </ThemeProvider>
  );
}

export default App;

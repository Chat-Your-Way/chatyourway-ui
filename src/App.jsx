import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
import lightTheme from './ui-kit/theme/theme';
import './App.css';
import EmailInput from './ui-kit/components/Input/EmailInput';
import SearchInput from './ui-kit/components/Input/SearchInput';
import PasswordInput from './ui-kit/components/Input/PasswordInput';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Typography variant="h1">hello world!</Typography>
      <EmailInput />
      <PasswordInput />
      <SearchInput />
    </ThemeProvider>
  );
}

export default App;

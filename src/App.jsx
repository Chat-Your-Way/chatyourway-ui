import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
import { createCommonTheme, palette } from './ui-kit/theme/theme';
import './App.css';
import { useMemo, useState } from 'react';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [currentTheme, setCurrentTheme] = useState('light');

  const theme = useMemo(
    () => createCommonTheme(palette(currentTheme)),
    [currentTheme],
  );

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1">hello world!</Typography>
    </ThemeProvider>
  );
}

export default App;

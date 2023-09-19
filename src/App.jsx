import { ThemeProvider } from '@mui/material';
import { createCommonTheme, palette } from './ui-kit/theme/theme';
import './App.css';
import { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './ui-kit/components/SharedLayout/SharedLayout';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [currentTheme, setCurrentTheme] = useState('light');

  const theme = useMemo(
    () => createCommonTheme(palette(currentTheme)),
    [currentTheme],
  );

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

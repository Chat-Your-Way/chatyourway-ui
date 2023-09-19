import { createContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { createCommonTheme, palette } from './theme';

export const ThemeContext = createContext();

export const CombinedThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const theme = useMemo(
    () => createCommonTheme(palette(currentTheme)),
    [currentTheme],
  );

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

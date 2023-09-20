import { createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { createCommonTheme, palette } from './theme';

export const ThemeContext = createContext();

export const CombinedThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('theme') || 'light',
  );

  const toggleTheme = () => {
    setCurrentTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

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

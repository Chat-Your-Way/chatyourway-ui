import { createTheme } from '@mui/material/styles';

const createCommonTheme = (theme) =>
  createTheme({
    ...theme,
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'Inter, sans-serif',
            color: theme.palette.primary.main,
          },
          h1: {
            fontSize: '48px',
            fontWeight: 'regular',
          },
          h2: {
            fontSize: '40px',
            fontWeight: 'regular',
          },
          h3: {
            fontSize: '32px',
            fontWeight: 'regular',
          },
          h4: {
            fontSize: '24px',
            fontWeight: 'regular',
          },
          h5: {
            fontSize: '16px',
            fontWeight: 'regular',
          },
          h6: {
            fontSize: '14px',
            fontWeight: 'regular',
          },
          myCustomVariant: {
            fontSize: '100px',
            fontWeight: 'bold',
            color: '#FF0000',
          },
          errorText: {
            fontSize: '14px',
            fontWeight: '400',
            color: '#DA4444',
            lineHeight: '135%',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            boxSizing: 'border-box',
            display: 'flex',
            padding: '12px',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid #6261AF',
            borderRadius: '8px',
            color: theme.palette.primary.dark,
            opacity: '0.6',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '135%',
          },
        },
      },
    },
    typography: {
      h1: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '48px',
        lineHeight: '135%',
        fontWeight: '400',
      },
      h2: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '40px',
        lineHeight: '135%',
        fontWeight: '400',
      },
      h3: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '32px',
        lineHeight: '135%',
        fontWeight: '400',
      },
      h4: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '24px',
        lineHeight: '135%',
        fontWeight: '400',
      },
      h5: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        lineHeight: '135%',
        fontWeight: '400',
      },
      h6: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        lineHeight: '135%',
        fontWeight: '400',
      },
    },
  });

const lightPalette = createTheme({
  palette: {
    primary: {
      white: '#FFFFFF',
      light: '#ACADFF',
      main: '#8686DC',
      dark: '#353535',
      contrastText: '#6261AF',
      disabled: '#EEEFFF',
      errorColor: '#DA4444',
    },
  },
});

const lightTheme = createTheme(createCommonTheme(lightPalette));

export default lightTheme;

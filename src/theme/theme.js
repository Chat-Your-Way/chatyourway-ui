import {createTheme} from '@mui/material/styles';

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
                },
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
        },
    },
});

const lightTheme = createTheme(createCommonTheme(lightPalette));

export default lightTheme;

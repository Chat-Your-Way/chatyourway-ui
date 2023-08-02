import './App.css';
import React from 'react';
import {ThemeProvider} from '@mui/material';
import lightTheme from './theme/theme';
import Typography from '@mui/material/Typography';

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <Typography variant="h1">hello world!</Typography>
        </ThemeProvider>
    );
}

export default App;

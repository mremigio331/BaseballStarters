import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline to reset default styles

import NavBar from './navigation/NavBar';
import Home from './pages/Home';

const BaseballStarters = () => {
    document.title = 'Baseball Starters';

    // Define dark mode theme
    const darkTheme = createTheme({
        palette: {
            mode: 'dark', // Set the mode to dark
            // Define your dark mode colors here
            primary: {
                main: '#90caf9', // Example primary color in dark mode
            },
            // Add more color definitions as needed
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline /> {/* Apply default styles reset */}
            <div>
                <div style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
                    <NavBar />
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
};

export default BaseballStarters;

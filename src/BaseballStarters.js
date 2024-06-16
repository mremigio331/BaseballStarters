import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DataProvider } from './contexts/DataContext';
import NavBar from './navigation/NavBar';
import Home from './pages/Home';

const BaseballStarters = () => {
    document.title = 'Baseball Starters';

    let defaultTheme = createTheme({
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
            error: {
                main: '#f44336',
            },
            background: {
                default: '#fafafa',
            },
            appBar: {
                main: '#4caf50',
            },
        },
        typography: {
            fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
        },
    });
    defaultTheme = responsiveFontSizes(defaultTheme);

    const theme = defaultTheme; // This is a placeholder. Use your logic to switch themes.

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DataProvider>
                <div style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
                    <NavBar />
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Add more routes as needed */}
                </Routes>
            </DataProvider>
        </ThemeProvider>
    );
};

export default BaseballStarters;

import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline to reset default styles
import { useData } from './contexts/DataContext';
import NavBar from './navigation/NavBar';
import Home from './pages/Home';

const BaseballStarters = () => {
    document.title = 'Baseball Starters';
    const { state } = useData();
    const { selectedTeam, selectedPlayers, startDate, endDate, seasonTypes, familyBet } = state;

    const defaultTheme = createTheme({
        palette: {
            primary: {
                main: '#1976d2', // A default blue color
            },
            secondary: {
                main: '#dc004e', // A default pink color
            },
            error: {
                main: '#f44336', // A default red color for error messages
            },
            background: {
                default: '#fafafa', // A default light background color
            },
        },
        typography: {
            fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
        },
    });

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

    const teamSelectedMode = createTheme({
        palette: {
            mode: 'teamSelected', // Set the mode to dark
            // Define your dark mode colors here
            primary: {
                main: '#132448', // Example primary color in dark mode
            },
            background: {
                paper: '#424242', // Background color for paper elements
                default: '#c4ced4', // Default background color
            },
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
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

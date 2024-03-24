import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import { DataProvider } from './contexts/DataContext';

import BaseballStarters from './BaseballStarters';

const queryClient = new QueryClient();

createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <DataProvider>
                        <BaseballStarters />
                    </DataProvider>
                </ThemeProvider>
            </LocalizationProvider>
        </QueryClientProvider>
    </BrowserRouter>,
);

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

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <React.StrictMode>
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
        </BrowserRouter>
    </React.StrictMode>,
);

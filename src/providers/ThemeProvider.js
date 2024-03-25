import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* Add more routes as needed */}
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;

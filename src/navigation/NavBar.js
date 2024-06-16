import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useData, ActionTypes } from '../contexts/DataContext';

const NavBar = () => {
    const { dispatch } = useData();
    const navigate = useNavigate();

    const handleReset = () => {
        dispatch({ type: ActionTypes.RESET });
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={handleReset}
                    >
                        Baseball Starters
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;

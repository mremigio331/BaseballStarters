import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography component={'span'} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Baseball Starters
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;

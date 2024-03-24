import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const ToggleDarkModeButton = ({ darkMode, toggleDarkMode }) => {
    return (
        <IconButton onClick={toggleDarkMode} color="inherit">
            <Brightness4Icon />
        </IconButton>
    );
};

export default ToggleDarkModeButton;

import React, { useState } from 'react';
import { List, Button, Drawer, ListItem, ListItemButton, ListItemIcon, ListSubheader, ListItemText, Divider, Box } from '@mui/material';
import { CalendarToday as CalendarTodayIcon, SportsBaseball as SportsBaseballIcon } from '@mui/icons-material';
import * as FamilyBet from '../constants/FamilyBet';
import { useData, ActionTypes } from '../contexts/DataContext';

const QuickLookUps = () => {
    const [open, setOpen] = useState(false);
    const { dispatch } = useData(); // Get the dispatch function from the DataContext

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const currentYear = new Date().getFullYear();
    const quickSeasonSelects = Array.from({ length: currentYear - 2019 }, (_, index) => {
        const year = currentYear - index;
        return { text: year.toString(), icon: <CalendarTodayIcon /> };
    });

    const preSets = [
        { text: 'Family Bet', icon: <SportsBaseballIcon /> }
    ];

    const handleItemClick = (item) => {
        console.log('Clicked:', item);
        if (item === 'Family Bet') {
            // Dispatch action to set selected team and players
            dispatch({ type: ActionTypes.SET_SELECTED_TEAM, payload: FamilyBet.FAMILY_BET_TEAM });
            dispatch({ type: ActionTypes.SET_SELECTED_PLAYERS, payload: FamilyBet.FAMILY_BET_SELECTED_PLAYERS });
            dispatch({ type: ActionTypes.SET_START_DATE, payload: FamilyBet.FAMILY_BET_START_DATE });
            dispatch({ type: ActionTypes.SET_END_DATE, payload: FamilyBet.FAMILY_BET_END_DATE });
        }
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Quick Lookups 
                    </ListSubheader>
                }
            >
                {/* Presets */}
                <ListItem >
                    <ListItemText primary="Presets" />
                </ListItem>
                {preSets.map((option, index) => (
                    <ListItem key={option.text} >
                        <ListItemButton onClick={() => handleItemClick(option.text)}>
                            <ListItemIcon>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText primary={option.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
                {/* Season Select */}
                <ListItem >
                    <ListItemText primary="Season Select" />
                </ListItem>
                {quickSeasonSelects.map((option, index) => (
                    <ListItem key={option.text} >
                        <ListItemButton onClick={() => handleItemClick(option.text)}>
                            <ListItemIcon>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText primary={option.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Quick Look Ups</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default QuickLookUps;
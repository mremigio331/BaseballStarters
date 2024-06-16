import React, { useState, useEffect } from 'react';
import {
    List,
    Button,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListSubheader,
    ListItemText,
    Divider,
    Box,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { CalendarToday as CalendarTodayIcon, SportsBaseball as SportsBaseballIcon } from '@mui/icons-material';
import * as FamilyBet from '../constants/FamilyBet';
import { useData, ActionTypes } from '../contexts/DataContext';
import dayjs from 'dayjs';

const QuickLookUps = () => {
    const [open, setOpen] = useState(false);
    const { dispatch } = useData();
    const theme = useTheme();
    // Using Material-UI's useMediaQuery hook to check for mobile screen size
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    console.log('isMobile', isMobile);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const currentYear = new Date().getFullYear();
    const quickSeasonSelects = Array.from({ length: currentYear - 2019 }, (_, index) => {
        const year = currentYear - index;
        return { id: 'year', text: `${year.toString()} Season`, year: year.toString(), icon: <CalendarTodayIcon /> };
    });

    const preSets = [{ id: 'presets', text: 'Family Bet', icon: <SportsBaseballIcon /> }];

    const handleItemClick = (item) => {
        if (item.id == 'presets' && item.text === 'Family Bet') {
            dispatch({ type: ActionTypes.SET_SELECTED_TEAM, payload: FamilyBet.FAMILY_BET_TEAM });
            dispatch({ type: ActionTypes.SET_SELECTED_PLAYERS, payload: FamilyBet.FAMILY_BET_SELECTED_PLAYERS });
            dispatch({ type: ActionTypes.SET_START_DATE, payload: FamilyBet.FAMILY_BET_START_DATE });
            dispatch({ type: ActionTypes.SET_END_DATE, payload: FamilyBet.FAMILY_BET_END_DATE });
            dispatch({ type: ActionTypes.SET_REGULAR_SEASON, payload: FamilyBet.FAMILY_BET_REGULAR_SEASON });
            dispatch({ type: ActionTypes.SET_POST_SEASON, payload: FamilyBet.FAMILY_BET_POST_SEASON });
            dispatch({ type: ActionTypes.SET_PRE_SEASON, payload: FamilyBet.FAMILY_BET_PRE_SEASON });
            dispatch({ type: ActionTypes.SET_FAMILY_BET, payload: true });
        } else if (item.id == 'year') {
            const startDate = dayjs(`${item.year}-02-01`).startOf('day');
            const today = dayjs().startOf('day');
            const endOfSeasonDate = dayjs(`${item.year}-11-01`).startOf('day');
            const endDate = today.isBefore(endOfSeasonDate) ? today : endOfSeasonDate;

            dispatch({ type: ActionTypes.SET_START_DATE, payload: startDate });
            dispatch({ type: ActionTypes.SET_END_DATE, payload: endDate });
            dispatch({ type: ActionTypes.SET_FAMILY_BET, payload: false });
        }
    };

    const drawerWidth = isMobile ? '100%' : 250;

    const DrawerList = (
        <Box sx={{ width: drawerWidth }} role="presentation" onClick={toggleDrawer(false)}>
            <List
                sx={{ width: 250, maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Quick Lookups
                    </ListSubheader>
                }
            >
                {/* Presets */}
                <ListItem>
                    <ListItemText primary="Presets" />
                </ListItem>
                {preSets.map((option, index) => (
                    <ListItem key={option.text}>
                        <ListItemButton onClick={() => handleItemClick(option)}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            <ListItemText primary={option.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
                {/* Season Select */}
                <ListItem>
                    <ListItemText primary="Season Select" />
                </ListItem>
                {quickSeasonSelects.map((option, index) => (
                    <ListItem key={option.text}>
                        <ListItemButton onClick={() => handleItemClick(option)}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
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
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                variant={isMobile ? 'temporary' : 'persistent'}
                anchor={isMobile ? 'bottom' : 'left'}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default QuickLookUps;

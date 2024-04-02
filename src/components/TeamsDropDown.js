import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllTeams } from '../api/api_calls';
import { useData } from '../contexts/DataContext';

const TeamsDropDown = () => {
    const { state, dispatch } = useData();
    const { selectedTeam, selectedPlayers } = state;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['teams'],
        queryFn: getAllTeams,
    });

    const handleChange = (event) => {
        const selectedTeam = data.find((item) => item.team.displayName === event.target.value);
        dispatch({ type: 'SET_SELECTED_TEAM', payload: selectedTeam.team });
        dispatch({ type: 'SET_SELECTED_PLAYERS', payload: [] });
        dispatch({ type: ActionTypes.SET_FAMILY_BET, payload: false });
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedTeam?.displayName || ''}
                label="Select Team"
                onChange={handleChange}
            >
                {data.map((team) => (
                    <MenuItem key={team.team.displayName} value={team.team.displayName}>
                        {team.team.displayName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TeamsDropDown;

import React from 'react';
import { FormControl, CircularProgress, TextField, Autocomplete } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllTeams } from '../api/api_calls';
import { useData, ActionTypes } from '../contexts/DataContext';

const TeamsDropDown = () => {
    const { state, dispatch } = useData();
    const { selectedTeam, selectedPlayers } = state;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['teams'],
        queryFn: getAllTeams,
    });

    const handleChange = (event, value) => {
        if (value) {
            const selectedTeam = data.find((item) => item.team.displayName === value);
            dispatch({ type: 'SET_SELECTED_TEAM', payload: selectedTeam.team });
            dispatch({ type: 'SET_SELECTED_PLAYERS', payload: [] });
            dispatch({ type: ActionTypes.SET_FAMILY_BET, payload: false });
        }
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <FormControl fullWidth>
            <Autocomplete
                id="team-select"
                options={data.map((team) => team.team.displayName)}
                value={selectedTeam?.displayName || ''}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
        </FormControl>
    );
};

export default TeamsDropDown;

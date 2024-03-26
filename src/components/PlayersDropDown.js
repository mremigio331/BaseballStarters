import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { useData } from '../contexts/DataContext';
import { useQuery } from '@tanstack/react-query';
import { getPlayersForTeam } from '../api/api_calls';

const PlayersDropDown = () => {
    const { state, dispatch } = useData();
    const { selectedTeam, selectedPlayers } = state;

    const { data, isRefetching, isError } = useQuery({
        queryKey: ['players', selectedTeam?.abbreviation],
        queryFn: () => getPlayersForTeam(selectedTeam?.abbreviation),
        enabled: !!selectedTeam?.abbreviation, // Only run the query if selectedTeam exists
    });

    const handleChange = (event) => {
        dispatch({ type: 'SET_SELECTED_PLAYERS', payload: event.target.value });
    };

    if (isRefetching) {
        return <CircularProgress />;
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="multi-select-label"></InputLabel>
            <Select
                labelId="multi-select-label"
                id="multi-select"
                multiple
                value={selectedPlayers}
                onChange={handleChange}
                label="Select Players"
            >
                {data?.map((player) => (
                    <MenuItem key={player.jerseyNumber} value={player.person.fullName}>
                        {player.person.fullName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default PlayersDropDown;

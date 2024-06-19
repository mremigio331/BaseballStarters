import React, { useState } from 'react';
import { FormControl, CircularProgress, TextField, Autocomplete, ListSubheader } from '@mui/material';
import { useData } from '../contexts/DataContext';
import { useQuery } from '@tanstack/react-query';
import { getPlayersForTeam } from '../api/api_calls';

const PlayersDropDown = () => {
    const { state, dispatch } = useData();
    const { selectedTeam, selectedPlayers, startDate, endDate } = state;
    const years = getYearsInRange(startDate, endDate);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, isRefetching, isError } = useQuery({
        queryKey: ['players', selectedTeam?.abbreviation, years],
        queryFn: () => getPlayersForTeam(selectedTeam?.abbreviation, years),
        enabled: !!selectedTeam?.abbreviation, // Only run the query if selectedTeam exists
    });

    const handleChange = (event, value) => {
        console.log(value);
        dispatch({ type: 'SET_SELECTED_PLAYERS', payload: value.map((player) => player.label) });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    if (isRefetching) {
        return <CircularProgress />;
    }

    const filteredPlayers = data?.filter((player) =>
        player.person.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const infielders = filteredPlayers?.filter(
        (player) => player.position.abbreviation !== 'P' && player.position.type === 'Infielder',
    );
    const outfielders = filteredPlayers?.filter(
        (player) =>
            player.position.abbreviation !== 'P' &&
            (player.position.type === 'Outfielder' || player.position.type === 'Hitter'),
    );

    const allPlayers = [
        ...(infielders?.map((player) => ({ id: player.person.id, label: player.person.fullName, type: 'Infielder' })) ||
            []),
        ...(outfielders?.map((player) => ({
            id: player.person.id,
            label: player.person.fullName,
            type: 'Outfielder',
        })) || []),
    ];
    allPlayers.sort((a, b) => a.label.localeCompare(b.label));

    const selectedPlayersObjects = selectedPlayers
        .map((id) => allPlayers.find((player) => player.label === id))
        .filter(Boolean);

    return (
        <FormControl fullWidth>
            <Autocomplete
                multiple
                options={allPlayers}
                getOptionLabel={(option) => option.label}
                value={selectedPlayersObjects}
                onChange={handleChange}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                renderOption={(props, option) => (
                    <li {...props}>
                        {option.label} ({option.type})
                    </li>
                )}
            />
        </FormControl>
    );
};

const getYearsInRange = (startDate, endDate) => {
    const startYear = startDate.$y;
    const endYear = endDate.$y;
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }

    return years;
};

export default PlayersDropDown;

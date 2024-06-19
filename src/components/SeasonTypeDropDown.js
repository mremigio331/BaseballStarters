import React from 'react';
import { FormControl, CircularProgress, TextField, Autocomplete, Typography } from '@mui/material';
import { useData, ActionTypes } from '../contexts/DataContext';
import { useQuery } from '@tanstack/react-query';
import { seasonTypeLookUp } from '../api/api_calls';

const SeasonTypeDropDown = () => {
    const { state, dispatch } = useData();
    const { seasonTypes } = state;

    const highlightedSeasonTypes = [
        { type: 'preseason', text: 'Pre Season' },
        { type: 'regular-season', text: 'Regular Season' },
        { type: 'post-season', text: 'Post Season' },
    ];

    const handleChange = (event, value) => {
        const newItems = value.map((item) => {
            switch (item) {
                case 'Pre Season':
                    return 'preseason';
                case 'Regular Season':
                    return 'regular-season';
                case 'Post Season':
                    return 'post-season';
                default:
                    return item;
            }
        });

        dispatch({ type: ActionTypes.SET_SEASON_TYPES, payload: newItems });
    };

    const selectedSeasonTypes = () => {
        return seasonTypes.map((type) => {
            switch (type) {
                case 'preseason':
                    return 'Pre Season';
                case 'regular-season':
                    return 'Regular Season';
                case 'post-season':
                    return 'Post Season';
                case 'Pre Season':
                    return 'Pre Season';
                case 'Regular Season':
                    return 'Regular Season';
                case 'Post Season':
                    return 'Post Season';
            }
        });
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography component={'span'} variant="body1" gutterBottom>
                Select Season Types
            </Typography>
            <Typography component={'span'}>
                <FormControl fullWidth>
                    <Autocomplete
                        multiple
                        id="season-type-select"
                        options={highlightedSeasonTypes.map((type) => type.text)}
                        value={selectedSeasonTypes()}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormControl>
            </Typography>
        </div>
    );
};

export default SeasonTypeDropDown;

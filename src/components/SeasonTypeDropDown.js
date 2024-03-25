import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useData, ActionTypes } from '../contexts/DataContext';
import { useQuery } from '@tanstack/react-query';
import { seasonTypeLookUp } from '../api/api_calls';

const SeasonTypeDropDown = () => {
    const { state, dispatch } = useData();
    const { seasonTypes, regularSeason, postSeason, presSeason } = state;

    const highlightedSeasonTypes = [
        { type: 'preseason', text: 'Pre Season' },
        { type: 'regular-season', text: 'Regular Season' },
        { type: 'post-season', text: 'Post Season' },
    ];


    const selectedSeasonTypes = () => {
        let newItems = []
        seasonTypes.map((type) => {
            switch (type) {
                case 'preseason':
                    newItems.push('Pre Season');
                  break;
                case 'regular-season':
                    newItems.push('Regular Season');
                  break; 
                case 'post-season':
                    newItems.push('Post Season');
                    break
                case 'Pre Season':
                    newItems.push('Pre Season');
                    break;
                    case 'Regular Season':
                        newItems.push('Regular Season');
                    break; 
                    case 'Post Season':
                        newItems.push('Post Season');
                  break;
            }})

        return newItems       
    }

    const handleChange = (event) => {
        let newItems = []
        event.target.value.forEach((target) => {
            switch (target) {
                case 'preseason':
                    newItems.push('preseason');
                  break;
                case 'regular-season':
                    newItems.push('regular-season');
                  break; 
                case 'post-season':
                    newItems.push('post-season');
                    break
                case 'Pre Season':
                    newItems.push('preseason');
                    break;
                    case 'Regular Season':
                        newItems.push('regular-season');
                    break; 
                    case 'Post Season':
                        newItems.push('post-season');
                  break;
            }})

        dispatch({ type: ActionTypes.SET_SEASON_TYPES, payload: newItems });
        
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography component={'span'} variant="body1" gutterBottom>
                Select Season Types
            </Typography>
            <Typography component={'span'}>
                <FormControl fullWidth>
                    <InputLabel id="multi-select-label"></InputLabel>
                    <Select
                        labelId="multi-select-label"
                        id="multi-select"
                        multiple
                        value={selectedSeasonTypes()}
                        onChange={handleChange}
                        label="Select Players"
                    >
                        {highlightedSeasonTypes?.map((type) => (
                            <MenuItem key={type.text} value={type.text}>
                                {type.text}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Typography>
        </div>
    );
};

export default SeasonTypeDropDown;

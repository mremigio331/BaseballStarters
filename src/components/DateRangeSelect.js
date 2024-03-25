import * as React from 'react';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useData } from '../contexts/DataContext';
import { ColumnLayout, DateRangePicker, SpaceBetween } from '@cloudscape-design/components';

const DateRangeSelect = () => {
    const { state, dispatch } = useData();
    const { startDate, endDate, currentDate } = state;

    const handleStartDateChange = (event) => {
        dispatch({ type: 'SET_START_DATE', payload: event });
    };

    const handleEndDateChange = (event) => {
        dispatch({ type: 'SET_END_DATE', payload: event });
    };

    return (
        <ColumnLayout columns={2} variant="text-grid">
            <div>
                <DatePicker
                    value={startDate}
                    onChange={handleStartDateChange}
                    maxDate={endDate}
                    style={{ width: '100%', marginBottom: '8px' }}
                />
            </div>
            <div>
                <DatePicker
                    value={endDate}
                    minDate={startDate}
                    maxDate={currentDate}
                    onChange={handleEndDateChange}
                    style={{ width: '100%', marginBottom: '8px' }}
                />
            </div>
        </ColumnLayout>
    );
};

export default DateRangeSelect;

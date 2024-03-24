import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TeamsDropDown from '../components/TeamsDropDown';
import PlayersDropDown from '../components/PlayersDropDown';
import DateRangeSelect from '../components/DateRangeSelect';
import { WhoStarted } from '../components/WhoStarted';
import DataGauges from '../components/DataGauges';
import { useQuery } from '@tanstack/react-query';
import { getStatistics } from '../api/api_calls';
import { useData, EMPTY_TEAM_SELECT, EMPTY_PLAYERS_ARRAY } from '../contexts/DataContext';
import QuickLookUps from '../components/QuickLookUps'; // Import the QuickLookUps component

const PlayersComponent = () => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography component={'span'} variant="body1" gutterBottom>
                Select your players
            </Typography>
            <Typography component={'span'}>
                <PlayersDropDown />
            </Typography>
        </div>
    );
};

const DatePickerComponent = () => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography component={'span'} variant="body1" gutterBottom>
                Select your date range
            </Typography>
            <Typography component={'span'}>
                <DateRangeSelect />
            </Typography>
        </div>
    );
};

const WhoStartedComonent = ({ data, selectedPlayers }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography component={'span'}>
                <DataGauges data={data} selectedPlayers={selectedPlayers} />
            </Typography>
            <Typography component={'span'}>
                <WhoStarted data={data} />
            </Typography>
        </div>
    );
};

const Home = () => {
    const { state } = useData();
    const { selectedTeam, selectedPlayers, startDate, endDate } = state;
    const [canQuery, setCanQuery] = useState(false); // Use useState for state management

    const { data, isLoading, isError } = useQuery({
        queryKey: ['statistics', startDate, endDate, selectedPlayers, selectedTeam?.displayName],
        queryFn: () => getStatistics(startDate, endDate, selectedPlayers, selectedTeam?.displayName),
        enabled: canQuery && !!selectedTeam?.displayName && selectedPlayers.length !== 0,
        onSuccess: () => setCanQuery(false), // Update state when query is successful
    });

    return (
        <Container maxWidth="xl" style={{ marginTop: '40px', marginBottom: '40px' }}>
            <Typography component={'span'} variant="h2" gutterBottom>
                Baseball Starters {<QuickLookUps />}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <div style={{ marginBottom: '20px' }}>
                        <Typography component={'span'} variant="body1" gutterBottom>
                            Select your team
                        </Typography>
                        <TeamsDropDown />
                    </div>
                    {selectedTeam != EMPTY_TEAM_SELECT && <PlayersComponent />}
                    {selectedPlayers.length !== 0 && <DatePickerComponent />}
                    {selectedPlayers.length !== 0 && (
                        <div style={{ marginTop: '20px' }}>
                            <Typography component={'span'} variant="body1" gutterBottom>
                                <Button variant="contained" onClick={() => setCanQuery(true)}>
                                    Load Games Info
                                </Button>
                            </Typography>
                        </div>
                    )}
                    {data != undefined && <WhoStartedComonent data={data} selectedPlayers={selectedPlayers} />}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;

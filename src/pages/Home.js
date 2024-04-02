import React, { useState } from 'react';
import { Tabs, Tab, Button, Typography, Container, CircularProgress, Grid } from '@mui/material';
import TeamsDropDown from '../components/TeamsDropDown';
import PlayersDropDown from '../components/PlayersDropDown';
import DateRangeSelect from '../components/DateRangeSelect';
import SeasonTypeDropDown from '../components/SeasonTypeDropDown';
import { StatsCards } from '../components/StatsCards';
import DataGauges from '../components/DataGauges';
import { useQuery } from '@tanstack/react-query';
import { getStatistics } from '../api/api_calls';
import { useData, EMPTY_TEAM_SELECT } from '../contexts/DataContext';
import QuickLookUps from '../components/QuickLookUps';
import FamilyBetsTable from '../components/FamilyBetsTable';

const PlayersComponent = () => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Typography component={'span'} variant="body1" gutterBottom>
                Select Players
            </Typography>
            <Typography component={'span'}>
                <PlayersDropDown />
            </Typography>
        </div>
    );
};

const DatePickerComponent = () => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Typography component={'span'} variant="body1" gutterBottom>
                Select Date Range
            </Typography>
            <Typography component={'span'}>
                <DateRangeSelect />
            </Typography>
        </div>
    );
};

const Home = () => {
    const { state } = useData();
    const { selectedTeam, selectedPlayers, startDate, endDate, seasonTypes, familyBet } = state;

    const [selectedTab, setSelectedTab] = useState(0); // State to manage selected tab

    const { data, isRefetching, isLoading, isError } = useQuery({
        queryKey: ['statistics', startDate, endDate, selectedPlayers, selectedTeam?.displayName, seasonTypes],
        queryFn: () => getStatistics(startDate, endDate, selectedPlayers, selectedTeam?.displayName, seasonTypes),
        enabled: !!selectedTeam?.displayName && selectedPlayers.length !== 0,
    });

    React.useEffect(() => {
        if (selectedTab === 3 && familyBet === false) {
            setSelectedTab(1);
        }
    }, [familyBet, selectedTab]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Container maxWidth="xl" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Typography component={'span'} variant="h2" gutterBottom>
                Baseball Starters {<QuickLookUps />}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ marginBottom: '10px' }}>
                        <Typography component={'span'} variant="body1" gutterBottom>
                            Select Team
                        </Typography>
                        <TeamsDropDown />
                    </div>
                    {selectedTeam != EMPTY_TEAM_SELECT && <PlayersComponent />}
                    {selectedPlayers.length !== 0 && <DatePickerComponent />}
                    {selectedPlayers.length !== 0 && <SeasonTypeDropDown />}
                    {isRefetching ||
                        (isLoading && (
                            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
                                <CircularProgress />
                            </Grid>
                        ))}
                    <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
                        <Tab label="All Games Overview" />
                        <Tab label="Individual Game Stats" />
                        {familyBet === true && <Tab label="Family Bet" />}
                    </Tabs>
                    {selectedTab === 0 && data !== undefined && (
                        <Typography component={'span'}>
                            <DataGauges data={data} selectedPlayers={selectedPlayers} />
                        </Typography>
                    )}

                    {selectedTab === 1 && data !== undefined && (
                        <Typography component={'span'}>
                            <StatsCards data={data} />
                        </Typography>
                    )}
                    {selectedTab === 2 && (
                        <FamilyBetsTable data={data} isLoading={isLoading} isRefetching={isRefetching} />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;

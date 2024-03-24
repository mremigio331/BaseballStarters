import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TeamsDropDown from '../components/TeamsDropDown';
import PlayersDropDown from '../components/PlayersDropDown';
import DateRangeSelect from '../components/DateRangeSelect';
import {WhoStarted} from '../components/WhoStarted'
import { useQuery } from '@tanstack/react-query';

import { getStatistics } from '../api/api_calls';

import { useData, EMPTY_TEAM_SELECT, EMPTY_PLAYERS_ARRAY } from '../contexts/DataContext';

const PlayersComponent = () => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography variant="body1" gutterBottom>
                Select your players
            </Typography>
            <Typography>
                <PlayersDropDown />
            </Typography>
        </div>
    );
};

const DatePickerComponent = () => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography variant="body1" gutterBottom>
                Select your date range
            </Typography>
            <Typography>
                <DateRangeSelect />
            </Typography>
        </div>
    );
};

const WhoStartedComonent = ({ data }) => {
    console.log('whoStarted', data)
    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography>
                <WhoStarted data = {data}/>
            </Typography>
        </div>
    );

}

const Home = () => {
    const { state } = useData();
    const { selectedTeam, selectedPlayers, startDate, endDate } = state;
    const [canQuery, setCanQuery] = React.useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['statistics', startDate, endDate, selectedPlayers, selectedTeam?.displayName],
        queryFn: () => getStatistics(startDate, endDate, selectedPlayers, selectedTeam?.displayName),
        enabled: canQuery && !!selectedTeam?.displayName && selectedPlayers.length !== 0,
    });

    console.log(data);

    return (
        <Container maxWidth="xl" style={{ marginTop: '40px', marginBottom: '40px' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Baseball Starters
            </Typography>
            <div style={{ marginBottom: '20px' }}>
                <Typography variant="body1" gutterBottom>
                    Select your team
                </Typography>
                <TeamsDropDown />
            </div>
            {selectedTeam != EMPTY_TEAM_SELECT && <PlayersComponent />}
            {selectedPlayers.length !== 0 && <DatePickerComponent />}
            {selectedPlayers.length !== 0 && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="body1" gutterBottom>
                        <Button variant="contained" onClick={() => setCanQuery(true)}>
                            Load Games Info
                        </Button>
                    </Typography>
                </div>
            )}
            {
                data != undefined &&  <WhoStartedComonent data={data}/>
            }
        </Container>
    );
};

export default Home;

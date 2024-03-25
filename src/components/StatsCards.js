import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../styles/StatsGrid.css';

const IndividualGameStatsCards = ({ date, allStarted, check }) => {
    return (
        <Card>
            <CardContent>
                <Typography component={'span'} variant="h6" gutterBottom>
                    Date: {new Date(date).toLocaleDateString()}
                </Typography>
                <Typography component={'span'} variant="body1" gutterBottom>
                    All Started: {allStarted ? 'Yes' : 'No'}
                </Typography>
                <Typography component={'span'} variant="body2">
                    Player Checks:
                    <ul>
                        {Object.entries(check).map(([player, data]) => (
                            <li key={player}>
                                {player} - Started: {data.started ? 'Yes' : 'No'}, Played: {data.played ? 'Yes' : 'No'}
                            </li>
                        ))}
                    </ul>
                </Typography>
            </CardContent>
        </Card>
    );
};

export const StatsCards = ({ data, isLoading }) => {
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <>
            {isLoading ? ( // Render loading indicator if isLoading is true
                <Grid container justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid container spacing={2}>
                    {sortedData.map((item, index) => (
                        <Grid key={index} item xs={12} sm={4} md={3}>
                            <IndividualGameStatsCards {...item} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

const getClass = (allStarted) => {
    if (allStarted) {
        return 'green-grid';
    } else {
        // Depending on your criteria, you might want to return 'yellow-grid' or 'red-grid' here
        return 'yellow-grid';
    }
};

import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../styles/StatsGrid.css'

const StatsCard = ({ date, allStarted, check }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Date: {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          All Started: {allStarted ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body2">
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

export const WhoStarted = ({ data }) => {
    return (
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3} className={getClass(item.allStarted)}>
              <StatsCard {...item} />
            </Grid>
          ))}
        </Grid>
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
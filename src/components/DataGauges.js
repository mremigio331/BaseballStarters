import React from 'react';
import { Grid, Typography, Container, Card, CardContent } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';

const DataGauges = ({ data, selectedPlayers }) => {
    return (
        <Container maxWidth="lg" style={{ marginTop: '40px', padding: '20px' }}>
            <FullDataGuages data={data} />
            <SelectedPlayerDataGuages data={data} selectedPlayers={selectedPlayers} />
        </Container>
    );
};

const FullDataGuages = ({ data }) => {
    let allStartedCount = 0;
    let allPlayedCount = 0;

    data.forEach((item) => {
        if (item.allStarted) {
            allStartedCount++;
        }
        if (item.allPlayed) {
            allPlayedCount++;
        }
    });

    const gaugeData = [
        { value: allStartedCount, maxValue: data.length, text: 'All Started' },
        { value: allPlayedCount, maxValue: data.length, text: 'All Played' },
    ];

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Typography variant="h3" component="h3" gutterBottom align="center">
                    All Player Metrics
                </Typography>
            </Grid>
            {gaugeData.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                    <div style={{ textAlign: 'center' }}>
                        <Gauge
                            width={500}
                            height={200}
                            value={item.value}
                            startAngle={-110}
                            valueMax={item.maxValue}
                            endAngle={110}
                        />
                        <Typography variant="body1" gutterBottom>
                            {`${item.value} / ${item.maxValue} ${item.text}`}
                        </Typography>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
};

const SelectedPlayerDataGuages = ({ data, selectedPlayers }) => {
    let individualPlayerMetrics = [];

    selectedPlayers.forEach((player) => {
        let playerStartedCount = 0;
        let playerPlayedCount = 0;

        data.forEach((item) => {
            if (item.check[player]) {
                if (item.check[player].started) {
                    playerStartedCount++;
                }
                if (item.check[player].played) {
                    playerPlayedCount++;
                }
            }
        });

        individualPlayerMetrics.push({
            player: player,
            gaugeData: [
                { value: playerStartedCount, maxValue: data.length, text: 'Started' },
                { value: playerPlayedCount, maxValue: data.length, text: 'Played' },
            ],
        });
    });

    return (
        <Container maxWidth="lg" style={{ marginTop: '40px', padding: '20px' }}>
            <Typography variant="h3" component="h3" gutterBottom>
                Individual Player Metrics
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {individualPlayerMetrics.map((playerMetric, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined" style={{ marginBottom: '20px' }}>
                            <CardContent>
                                <Typography variant="h4" component="h4" gutterBottom align="center">
                                    {playerMetric.player}
                                </Typography>
                                <Grid container spacing={2} justifyContent="center">
                                    {playerMetric.gaugeData.map((gauge, gaugeIndex) => (
                                        <Grid item xs={12} key={gaugeIndex}>
                                            <div style={{ textAlign: 'center' }}>
                                                <Gauge
                                                    width={300}
                                                    height={100}
                                                    value={gauge.value}
                                                    startAngle={-110}
                                                    valueMax={gauge.maxValue}
                                                    endAngle={110}
                                                    text={({ value, valueMax }) => `${value}/${valueMax} ${gauge.text}`}
                                                />
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default DataGauges;

import React, { useState } from 'react';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import * as FamilyBet from '../constants/FamilyBet';

const FamilyBetsTable = ({ data, isLoading, isRefetching }) => {
    const [sortedBy, setSortedBy] = useState('games');
    const [ascending, setAscending] = useState(true);

    if (isLoading || isRefetching || !data) {
        return <CircularProgress />;
    }

    // Calculate allStartedCount and allStartedPercentage
    const allStartedCount = data.reduce((count, item) => count + (item.allStarted ? 1 : 0), 0);
    const allStartedPercentage = (allStartedCount / data.length) * 100;

    // Calculate differences based on allStartedPercentage and find the closest entry
    let closestEntry = null;
    let minDifference = Infinity;
    let maxGamesEntry = null;

    FamilyBet.FAMILY_BET_BETS.forEach((bet) => {
        bet.projectedWinner = false;
        bet.winner = false;
        bet.stillIn = false;

        const difference = Math.abs(allStartedPercentage - bet.percentage);
        if (difference < minDifference) {
            closestEntry = bet;
            minDifference = difference;
        }

        if (!maxGamesEntry || bet.games > maxGamesEntry.games) {
            maxGamesEntry = bet;
        }
    });

    if (closestEntry) {
        closestEntry.projectedWinner = true;
    }

    // Check if there's only one team with stillIn set to true
    const stillInTeams = data.filter((item) => item.stillIn);
    if (stillInTeams.length === 1) {
        stillInTeams[0].winner = true;
    } else if (stillInTeams.length === 0 && maxGamesEntry) {
        maxGamesEntry.winner = true;
        maxGamesEntry.stillIn = true;
    }

    const handleSort = (sortBy) => {
        if (sortedBy === sortBy) {
            setAscending(!ascending);
        } else {
            setSortedBy(sortBy);
            setAscending(true);
        }
    };

    const compareValues = (a, b) => {
        if (a[sortedBy] < b[sortedBy]) {
            return ascending ? -1 : 1;
        }
        if (a[sortedBy] > b[sortedBy]) {
            return ascending ? 1 : -1;
        }
        return 0;
    };

    const sortedBets = FamilyBet.FAMILY_BET_BETS.slice().sort(compareValues);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => handleSort('name')}>Name</TableCell>
                        <TableCell onClick={() => handleSort('games')}>Bet</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedBets.map((bet, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {allStartedCount > bet.games && !bet.winner ? (
                                    <span style={{ marginLeft: '5px', color: 'red', textDecoration: 'line-through' }}>
                                        {bet.name}
                                    </span>
                                ) : (
                                    bet.name
                                )}
                                {bet.winner && <span style={{ marginLeft: '5px', color: 'green' }}>Winner</span>}
                                {!bet.winner && bet.projectedWinner && (
                                    <span style={{ marginLeft: '5px', color: 'green' }}>Projected Winner</span>
                                )}
                            </TableCell>
                            <TableCell>{bet.games}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FamilyBetsTable;

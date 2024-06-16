import React, { useState } from 'react';
import {
    Container,
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

    let allStartedCount = 0;

    if (isLoading || isRefetching || data == undefined) {
        return <CircularProgress />;
    }

    data != undefined &&
        data.forEach((item) => {
            if (item.allStarted) {
                allStartedCount++;
            }
        });

    const allStartedPercentage = (allStartedCount / data.length) * 100;

    console.log(allStartedPercentage);

    const differences = FamilyBet.FAMILY_BET_BETS.map((bet) => Math.abs(allStartedPercentage - bet.percentage));

    const minDifferenceIndex = differences.indexOf(Math.min(...differences));

    FamilyBet.FAMILY_BET_BETS[minDifferenceIndex].projectedWinner = true;

    console.log('FAMILY_BET_BETS', FamilyBet.FAMILY_BET_BETS);

    console.log('allStartedCount', allStartedCount);

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

    console.log(sortedBets);

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
                                {allStartedCount > bet.games ? (
                                    <span style={{ marginLeft: '5px', color: 'red', textDecoration: 'line-through' }}>
                                        {bet.name}
                                    </span>
                                ) : (
                                    bet.name
                                )}
                                {bet.projectedWinner && (
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

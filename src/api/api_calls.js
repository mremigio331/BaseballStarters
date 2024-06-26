import * as React from 'react';
import axios from 'axios';
import { StatsApiCodes } from '../constants/StatsApiCodes';

export const getAllTeams = async () => {
    const rawTeams = await allTeamsAPICall();

    return rawTeams.sports[0].leagues[0].teams;
};

const allTeamsAPICall = async () => {
    const requestURL = `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams`;
    const response = await axios
        .get(requestURL)
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error;
        });

    return response.data;
};

export const getPlayersForTeam = async (abbreviation, years) => {
    const playersArrayPromises = years.map((year) => teamRosterApiCall(StatsApiCodes[abbreviation], year));

    const playersArray = await Promise.all(playersArrayPromises);

    const allPlayers = playersArray.flatMap((playersData) => playersData.roster);

    const uniquePlayersMap = new Map();
    allPlayers.forEach((player) => {
        if (!uniquePlayersMap.has(player.person.id)) {
            uniquePlayersMap.set(player.person.id, player);
        }
    });

    const uniquePlayers = Array.from(uniquePlayersMap.values());
    uniquePlayers.sort((a, b) => a.person.fullName.localeCompare(b.person.fullName));

    return uniquePlayers;
};

const teamRosterApiCall = async (teamId, year) => {
    const requestURL = `https://statsapi.mlb.com/api/v1/teams/${teamId}/roster?rosterType=fullRoster&season=${year}`;
    const response = await axios
        .get(requestURL)
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error;
        });

    return response.data;
};

export const getStatistics = async (startDate, endDate, players, team, seasonTypes) => {
    try {
        const datesLookup = DatesIdentifier(startDate, endDate);
        let games = [];
        let gameSummaries = [];
        let finalData = [];

        await Promise.all(
            datesLookup.map(async (date) => {
                const dateGames = await ESPNAPI(date);
                dateGames.events.map((game) => games.push(game));
            }),
        );
        const scrubbedGames = await GamesScrubber(team, games, seasonTypes);
        await Promise.all(
            scrubbedGames.map(async (specificGame) => {
                const gameSummary = await ESPNSumaryAPI(specificGame.id);
                gameSummaries.push({ date: specificGame.date, summary: gameSummary });
            }),
        );
        gameSummaries.map((specificGame) => {
            finalData.push(fullStartersCheck(players, specificGame.summary, specificGame.date));
        }); // Wait for scrubbedGames to resolve
        // scrubbedGames.map(async (game) => await finalData.push(fullStartersCheck(players, game, game.date)));

        return finalData;
    } catch (error) {
        console.error('Error fetching statistics:', error);
        // If there's an error, return an empty array or handle it as per your requirement
        return [];
    }
};

const DatesIdentifier = (startDate, endDate) => {
    const newStartDate = startDate.format('YYYY/MM/DD');
    const newEndDate = endDate.format('YYYY/MM/DD');

    for (var dates = [], dt = new Date(newStartDate); dt <= new Date(newEndDate); dt.setDate(dt.getDate() + 1)) {
        dates.push(new Date(dt).toISOString().split('T')[0].replaceAll('-', ''));
    }

    return dates;
};

const ESPNAPI = async (date) => {
    const requestURL = `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?calendartype=whitelist&limit=100&dates=${date}`;
    const response = await axios
        .get(requestURL)
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error;
        });

    return response.data;
};

const ESPNSumaryAPI = async (gameId) => {
    const requestURL = `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event=${gameId}`;
    const response = await axios
        .get(requestURL)
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error;
        });

    return response.data;
};

const GamesScrubber = async (team, games, seasonTypes) => {
    let allGames = [];

    games.forEach((game) => {
        const homeTeam = game.competitions[0].competitors[0].team.displayName;
        const awayTeam = game.competitions[0].competitors[1].team.displayName;
        const gameType = game.season.slug;
        const status = game.status.type.name;

        if ((homeTeam === team || awayTeam === team) && seasonTypes.includes(gameType) && status == 'STATUS_FINAL') {
            allGames.push(game);
        }
    });

    return allGames;
};

const fullStartersCheck = (starters, gameSummary, date) => {
    const startersDict = {};

    // Initialize starters dictionary
    starters.forEach((starter) => {
        startersDict[starter] = { started: false, played: false };
    });

    try {
        gameSummary.rosters[0].roster.forEach((player) => {
            const fullName = player.athlete.fullName;
            if (startersDict.hasOwnProperty(fullName)) {
                startersDict[fullName].played = true;
                startersDict[fullName].started = player.starter;
            }
        });

        gameSummary.rosters[1].roster.forEach((player) => {
            const fullName = player.athlete.fullName;
            if (startersDict.hasOwnProperty(fullName)) {
                startersDict[fullName].played = true;
                startersDict[fullName].started = player.starter;
            }
        });

        const allStarted = Object.values(startersDict).every((value) => value.started === true);
        const allPlayed = Object.values(startersDict).every((value) => value.played === true);
        const startsCheckDict = { date: date, allStarted: allStarted, allPlayed: allPlayed, check: startersDict };
        return startsCheckDict;
    } catch (error) {
        const startsCheckDict = { date: date, allStarted: false, allPlayed: false, check: startersDict };
        return startsCheckDict;
    }
};

export const seasonTypeLookUp = (regularSeason, postSeason, presSeason) => {
    let seasonTypes = [];
    regularSeason == true && seasonTypes.push('regular-season');
    postSeason == true && seasonTypes.push('post-season');
    presSeason == true && seasonTypes.push('preseason');

    return seasonTypes;
};

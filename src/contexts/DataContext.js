// src/contexts/DataContext.js
import React, { createContext, useReducer, useContext } from 'react';
import dayjs from 'dayjs';

export const EMPTY_TEAM_SELECT = {};
export const EMPTY_PLAYERS_ARRAY = [];

const currentDate = dayjs();

const endDate = currentDate.startOf('day');

const startDate = currentDate.subtract(7, 'day').startOf('day');

const formatDateString = (date) => {
    return date.format('YYYY-MM-DD');
};

const initialState = {
    selectedTeam: EMPTY_TEAM_SELECT,
    selectedPlayers: EMPTY_PLAYERS_ARRAY,
    startDate: startDate,
    endDate: endDate,
    currentDate: currentDate,
    seasonTypes: ['regular-season'],
    regularSeason: true,
    postSeason: false,
    preSeason: false,
    familyBet: false,
};

export const ActionTypes = {
    SET_SELECTED_TEAM: 'SET_SELECTED_TEAM',
    SET_SELECTED_PLAYERS: 'SET_SELECTED_PLAYERS',
    SET_START_DATE: 'SET_START_DATE',
    SET_END_DATE: 'SET_END_DATE',
    SET_REGULAR_SEASON: 'SET_REGULAR_SEASON',
    SET_POST_SEASON: 'SET_POST_SEASON',
    SET_PRE_SEASON: 'SET_PRE_SEASON',
    SET_SEASON_TYPES: 'SET_SEASON_TYPES',
    SET_FAMILY_BET: 'SET_FAMILY_BET',
    RESET: 'RESET',
};

const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_SELECTED_TEAM:
            return { ...state, selectedTeam: action.payload };
        case ActionTypes.SET_SELECTED_PLAYERS:
            return { ...state, selectedPlayers: action.payload };
        case ActionTypes.SET_START_DATE:
            return { ...state, startDate: action.payload };
        case ActionTypes.SET_END_DATE:
            return { ...state, endDate: action.payload };
        case ActionTypes.SET_REGULAR_SEASON:
            return { ...state, regularSeason: action.payload };
        case ActionTypes.SET_POST_SEASON:
            return { ...state, postSeason: action.payload };
        case ActionTypes.SET_PRE_SEASON:
            return { ...state, preSeason: action.payload };
        case ActionTypes.SET_SEASON_TYPES:
            return { ...state, seasonTypes: action.payload };
        case ActionTypes.SET_FAMILY_BET:
            return { ...state, familyBet: action.payload };
        case ActionTypes.RESET:
            return initialState;
        default:
            return state;
    }
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const dataContext = useContext(DataContext);
    if (!dataContext) {
        throw new Error('useData must be used within a DataProvider');
    }
    return dataContext;
};

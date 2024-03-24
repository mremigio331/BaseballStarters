import React, { createContext, useState, useContext } from 'react';
import dayjs from 'dayjs';
// Define a default value for team
export const EMPTY_TEAM_SELECT = {};
export const EMPTY_PLAYERS_ARRAY = [];

const REMIGIO_TEAM_SELECT = {
    "id": "10",
    "uid": "s:1~l:10~t:10",
    "slug": "new-york-yankees",
    "abbreviation": "NYY",
    "displayName": "New York Yankees",
    "shortDisplayName": "Yankees",
    "name": "Yankees",
    "nickname": "New York",
    "location": "New York",
    "color": "132448",
    "alternateColor": "c4ced4",
    "isActive": true,
    "isAllStar": false,
    "logos": [
      {
        "href": "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
        "alt": "",
        "rel": [
          "full",
          "default"
        ],
        "width": 500,
        "height": 500
      },
      {
        "href": "https://a.espncdn.com/i/teamlogos/mlb/500-dark/nyy.png",
        "alt": "",
        "rel": [
          "full",
          "dark"
        ],
        "width": 500,
        "height": 500
      },
      {
        "href": "https://a.espncdn.com/i/teamlogos/mlb/500/scoreboard/nyy.png",
        "alt": "",
        "rel": [
          "full",
          "scoreboard"
        ],
        "width": 500,
        "height": 500
      },
      {
        "href": "https://a.espncdn.com/i/teamlogos/mlb/500-dark/scoreboard/nyy.png",
        "alt": "",
        "rel": [
          "full",
          "scoreboard",
          "dark"
        ],
        "width": 500,
        "height": 500
      }
    ],
    "links": [
      {
        "language": "en-US",
        "rel": [
          "clubhouse",
          "desktop",
          "team"
        ],
        "href": "https://www.espn.com/mlb/team/_/name/nyy/new-york-yankees",
        "text": "Clubhouse",
        "shortText": "Clubhouse",
        "isExternal": false,
        "isPremium": false,
        "isHidden": false
      },
      {
        "language": "en-US",
        "rel": [
          "roster",
          "desktop",
          "team"
        ],
        "href": "http://www.espn.com/mlb/team/roster/_/name/nyy/new-york-yankees",
        "text": "Roster",
        "shortText": "Roster",
        "isExternal": false,
        "isPremium": false,
        "isHidden": false
      },
      {
        "language": "en-US",
        "rel": [
          "stats",
          "desktop",
          "team"
        ],
        "href": "http://www.espn.com/mlb/team/stats/_/name/nyy/new-york-yankees",
        "text": "Statistics",
        "shortText": "Statistics",
        "isExternal": false,
        "isPremium": false,
        "isHidden": false
      },
      {
        "language": "en-US",
        "rel": [
          "schedule",
          "desktop",
          "team"
        ],
        "href": "https://www.espn.com/mlb/team/schedule/_/name/nyy",
        "text": "Schedule",
        "shortText": "Schedule",
        "isExternal": false,
        "isPremium": false,
        "isHidden": false
      },
      {
        "language": "en-US",
        "rel": [
          "tickets",
          "desktop",
          "team"
        ],
        "href": "https://www.vividseats.com/new-york-yankees-tickets--sports-mlb-baseball/performer/607?wsUser=717",
        "text": "Tickets",
        "shortText": "Tickets",
        "isExternal": true,
        "isPremium": false,
        "isHidden": false
      },
      {
        "language": "en-US",
        "rel": [
          "depthchart",
          "desktop",
          "team"
        ],
        "href": "https://www.espn.com/mlb/team/depth/_/name/nyy",
        "text": "Depth Chart",
        "shortText": "Depth Chart",
        "isExternal": false,
        "isPremium": false,
        "isHidden": false
      }
    ]
  }
const REMIGIO_SELECTED_PLAYERS = [
    "Aaron Judge",
    "Anthony Rizzo",
    "DJ LeMahieu"
  ]

const currentDate = dayjs();

// Get the start date (current date)
const endDate = currentDate.startOf('day');

// Get the end date (7 days later)
const startDate = currentDate.subtract(7, 'day').startOf('day');

// Format the dates as strings
const formatDateString = (date) => {
    return date.format('YYYY-MM-DD');
};

const initialState = {
    selectedTeam: REMIGIO_TEAM_SELECT,
    selectedPlayers: REMIGIO_SELECTED_PLAYERS,
    startDate: startDate,
    endDate: endDate,
    currentDate: currentDate,
};

const ActionTypes = {
    SET_SELECTED_TEAM: 'SET_SELECTED_TEAM',
    SET_SELECTED_PLAYERS: 'SET_SELECTED_PLAYERS',
    SET_START_DATE: 'SET_START_DATE',
    SET_END_DATE: 'SET_END_DATE',
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
        default:
            return state;
    }
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};

// Create a custom hook to consume the context
export const useData = () => {
    const dataContext = useContext(DataContext);
    if (!dataContext) {
        throw new Error('useData must be used within a DataProvider');
    }
    return dataContext;
};
